package net.savantly.sprout.core.ui;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.function.Consumer;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

public class UiLoader<T> {
	private static final Logger log = LoggerFactory.getLogger(UiLoader.class);
	
	SproutResourcePatternResolver<T> resolver;
	private String destinationFolder;
	private boolean isWindows = System.getProperty("os.name")
			  .toLowerCase().startsWith("windows");

	public UiLoader(SproutResourcePatternResolver<T> resolver, String destinationFolder) {
		this.resolver = resolver;
		this.destinationFolder = destinationFolder;
	}
	
	public void init() throws IOException, InterruptedException {
		extractZippedClientFiles();
		buildClientApp();
	}

	private void extractZippedClientFiles() throws IOException {
		Resource[] resourcePaths = resolver.getResourcePaths("classpath*:/**/*-resources.zip");
		if(resourcePaths.length == 0) {
			throw new RuntimeException("No client resource zip files found in classpath.");
		}
		for (Resource resource : resourcePaths) {
			extractFolder(resource.getFile(), destinationFolder, false);
		}
	}
	
	private void buildClientApp() throws IOException, InterruptedException {
		ProcessBuilder builder = new ProcessBuilder();
		if (isWindows) {
		    builder.command(getWindowsBuildArgs());
		} else {
		    builder.command(getLinuxBuildArgs());
		}
		builder.directory(new File(this.destinationFolder));
		Process process = builder.start();
		StreamGobbler streamGobbler = 
		  new StreamGobbler(process.getInputStream(), System.out::printf);
		Executors.newSingleThreadExecutor().submit(streamGobbler);
		int exitCode = process.waitFor();
		assert exitCode == 0;
	}
	
    
    private List<String> getLinuxBuildArgs() {
		return Arrays.asList("/opt/node-v6.10.2-linux-x64/bin/npm", "build");
	}

	private List<String> getWindowsBuildArgs() {
		// TODO Auto-generated method stub
		return null;
	}

	private void extractFolder(File zipFile, String targetFolder, boolean createSubDirectory) throws ZipException, IOException 
    {
        System.out.println(zipFile);
        int BUFFER = 2048;

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
            //destFile = new File(newPath, destFile.getName());
            File destinationParent = destFile.getParentFile();
            if(destinationParent != null) {
                // create the parent directory structure if needed
                destinationParent.mkdirs();
            }

            if (!entry.isDirectory())
            {
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
                // found a zip file, try to open
                extractFolder(destFile, null, true);
            }
        }
    }
	
    private static class StreamGobbler implements Runnable {
        private InputStream inputStream;
        private Consumer<String> consumer;
     
        public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }
     
        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines()
              .forEach(consumer);
        }
    }

}