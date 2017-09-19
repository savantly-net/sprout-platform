package net.savantly.sprout.core.ui;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

public class UiLoader<T> {
	private static final Logger log = LoggerFactory.getLogger(UiLoader.class);
	
	SproutResourcePatternResolver<T> resolver;
	private String destinationFolder;
	private List<String> installArgs;
	private List<String> buildArgs;
	private String searchPattern;
	private String nodeBin;
	private String npmBin;
	private boolean extract;
	private boolean compile;

	public UiLoader(UiLoaderBuilder uiLoaderBuilder) {
		this.resolver = uiLoaderBuilder.resolver;
		this.destinationFolder = uiLoaderBuilder.destinationFolder;
		this.installArgs = uiLoaderBuilder.installArgs;
		this.buildArgs = uiLoaderBuilder.buildArgs;
		this.searchPattern = uiLoaderBuilder.searchPattern;
		this.nodeBin = uiLoaderBuilder.nodeBin;
		this.npmBin = uiLoaderBuilder.npmBin;
		this.extract = uiLoaderBuilder.extract;
		this.compile = uiLoaderBuilder.compile;
		try {
			init();
		} catch (IOException | InterruptedException e) {
			log.error("Failed to Load UI: {}", e);
		}
	}

	private void init() throws IOException, InterruptedException {
		if(this.extract) {
			extractZippedClientFiles();
		}
		if(this.compile) {
			executeCommands(installArgs);
			executeCommands(buildArgs);
		}
	}

	private void extractZippedClientFiles() throws IOException {
		Resource[] resourcePaths = resolver.getResourcePaths(searchPattern);
		if(resourcePaths.length == 0) {
			throw new RuntimeException("No files found that match search pattern: " + searchPattern);
		}
		for (Resource resource : resourcePaths) {
			extractFolder(resource.getFile(), destinationFolder, false);
		}
	}
	
	

	private void executeCommands(List<String> args) throws IOException, InterruptedException {
		log.info("Executing command: {}", args);
		ProcessBuilder builder = new ProcessBuilder();
		builder.command(args);
		builder.directory(new File(this.destinationFolder));
		
		builder.redirectErrorStream(true);
		 
		Process process = builder.start();
		Executors.newSingleThreadExecutor().submit(() -> {
			new BufferedReader(new InputStreamReader(process.getInputStream())).lines()
            .forEach(log::info);
		});
		int exitCode = process.waitFor();
		assert exitCode == 0;
	}

	private void extractFolder(File zipFile, String targetFolder, boolean createSubDirectory) throws ZipException, IOException 
    {
        System.out.println(zipFile);
        int BUFFER = 1024;

        ZipFile zip = new ZipFile(zipFile);
        String fileName = zipFile.getName();
        String newPath = fileName.substring(0, fileName.length() - 4);

        new File(newPath).mkdir();
        Enumeration zipFileEntries = zip.entries();

        // Process each entry
        while (zipFileEntries.hasMoreElements())
        {
            // grab a zip file entry
            ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();
            String currentEntry = entry.getName();
            File destFile = new File(targetFolder, currentEntry);
            File destinationParent = destFile.getParentFile();
            if(destinationParent != null) {
                // create the parent directory structure if needed
                destinationParent.mkdirs();
            }

            if (!entry.isDirectory())
            {
            	log.info("Extracting file: {} -> {}", currentEntry, destFile.getAbsolutePath());
                BufferedInputStream is = new BufferedInputStream(zip
                .getInputStream(entry));
                int currentByte;
                // establish buffer for writing file
                byte data[] = new byte[BUFFER];

                // write the current file to disk
                FileOutputStream fos = new FileOutputStream(destFile);
                BufferedOutputStream dest = new BufferedOutputStream(fos,
                BUFFER);

                // read and write until last byte is encountered
                while ((currentByte = is.read(data, 0, BUFFER)) != -1) {
                    dest.write(data, 0, currentByte);
                }
                dest.flush();
                dest.close();
                is.close();
            }

            if (currentEntry.endsWith(".zip"))
            {
            	log.info("Extracting zip file: {}", currentEntry);
                // found a zip file, try to open
                extractFolder(destFile, null, true);
            }
        }
    }
	
	 public static class UiLoaderBuilder {
			SproutResourcePatternResolver resolver;
			private boolean isWindows = System.getProperty("os.name")
					  .toLowerCase().startsWith("windows");
			private String destinationFolder = Paths.get(System.getProperty("user.home"), "sprout-ui").toString();
			private List<String> installArgs;
			private List<String> buildArgs;
			private String searchPattern = "classpath*=/**/*-resources-zip";
			private String NODE_PATH = System.getenv("NODE_PATH");
			private String nodeBin = "/usr/bin/node";
			private String npmBin = "/usr/bin/npm";
			private boolean extract = false;
			private boolean compile = false;

			public UiLoaderBuilder() {
				if(NODE_PATH != null){
					nodeBin = String.format("%s/node", NODE_PATH);
					npmBin = String.format("%s/npm", NODE_PATH);
				} else {
					log.warn("NODE_PATH is not set");
				}
				
				if(isWindows) {
					installArgs = getWindowsInstallArgs();
					buildArgs = getWindowsBuildArgs();
				} else {
					installArgs = getLinuxInstallArgs();
					buildArgs = getLinuxBuildArgs();
				}
			}
			
			private List<String> getLinuxInstallArgs() {
				return Arrays.asList(nodeBin, npmBin, "install");
			}

			private List<String> getWindowsInstallArgs() {
				return Arrays.asList(npmBin+".cmd", "install");
			}
			
		    private List<String> getLinuxBuildArgs() {
				return Arrays.asList(nodeBin, npmBin, "run", "build");
			}

			private List<String> getWindowsBuildArgs() {
				return Arrays.asList(npmBin+".cmd", "run", "build");
			}

			
			public UiLoaderBuilder resolver(SproutResourcePatternResolver resolver) {
				this.resolver = resolver;
				return this;
			}
			
			public UiLoaderBuilder destinationFolder(String destinationFolder) {
				this.destinationFolder = destinationFolder;
				return this;
			}
			
			public UiLoaderBuilder searchPattern(String searchPattern) {
				this.searchPattern = searchPattern;
				return this;
			}
			
			public UiLoaderBuilder nodeBin(String nodeBin) {
				this.nodeBin = nodeBin;
				return this;
			}
			
			public UiLoaderBuilder npmBin(String npmBin) {
				this.npmBin = npmBin;
				return this;
			}
			
			public UiLoaderBuilder extract(boolean extract) {
				this.extract = extract;
				return this;
			}
			
			public UiLoaderBuilder compile(boolean compile) {
				this.compile = compile;
				return this;
			}
			
			public UiLoader build() {
				return new UiLoader(this);
			}
	 }

}