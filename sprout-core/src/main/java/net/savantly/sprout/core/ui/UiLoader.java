package net.savantly.sprout.core.ui;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

public class UiLoader<T> {

	private static final Logger log = LoggerFactory.getLogger(UiLoader.class);

	SproutResourcePatternResolver<T> resolver;
	private String sproutHome;
	private List<String> installArgs;
	private List<String> buildArgs;
	private String zipSearchPattern;
	private String sproutPluginSearchPattern = "classpath*:/**/sprout/plugins/*";
	private String overlaySearchPattern = "classpath*:/**/sprout/overlay/*";
	private boolean extract;
	private boolean compile;

	public UiLoader(UiLoaderBuilder uiLoaderBuilder) {
		this.resolver = uiLoaderBuilder.resolver;
		this.sproutHome = uiLoaderBuilder.destinationFolder;
		this.installArgs = uiLoaderBuilder.installArgs;
		this.buildArgs = uiLoaderBuilder.buildArgs;
		this.zipSearchPattern = uiLoaderBuilder.zipSearchPattern;
		this.extract = uiLoaderBuilder.extract;
		this.compile = uiLoaderBuilder.compile;
		try {
			init();
		} catch (IOException | InterruptedException e) {
			log.error("Failed to Load UI: {}", e);
		}
	}

	private void init() throws IOException, InterruptedException {
		if (this.extract) {
			extractZippedClientFiles();
			extractClientPlugins();
			extractClientOverlays();
		}
		if (this.compile) {
			executeCommands(installArgs);
			executeCommands(buildArgs);
		}
	}

	private void extractClientOverlays() {
		Resource[] resourcePaths = resolver.getResourcePaths(overlaySearchPattern);
		if (resourcePaths.length == 0) {
			log.info("No Sprout overlay files found");
		}
		for (Resource resource : resourcePaths) {
			try {
				Path destinationPath = Paths.get(sproutHome, resource.getFilename());
				destinationPath.toFile().mkdirs();
				copy(resource.getInputStream(), destinationPath);
			} catch (IOException e) {
				log.warn("could not access resource", e);
			}
		}
	}

	private void extractClientPlugins() {
		Resource[] resourcePaths = resolver.getResourcePaths(sproutPluginSearchPattern);
		Path pluginFolderPath = Paths.get(sproutHome, "./plugins/");
		pluginFolderPath.toFile().mkdirs();
		if (resourcePaths.length == 0) {
			log.info("No Sprout client side plugins found");
		}
		for (Resource resource : resourcePaths) {
			try {
				copy(resource.getInputStream(), Paths.get(pluginFolderPath.toString(), resource.getFilename()));
			} catch (IOException e) {
				log.warn("could not access resource", e);
			}
		}
	}

	private void extractZippedClientFiles() throws IOException {
		Resource[] resourcePaths = resolver.getResourcePaths(zipSearchPattern);
		if (resourcePaths.length == 0) {
			throw new RuntimeException("No files found that match search pattern: " + zipSearchPattern);
		}
		for (Resource resource : resourcePaths) {
			extractFolder(resource.getFile(), sproutHome, false);
		}
	}

	private void executeCommands(List<String> args) throws IOException, InterruptedException {
		log.info("Executing command: {}", args);
		ProcessBuilder builder = new ProcessBuilder();
		builder.command(args);
		builder.directory(new File(this.sproutHome));

		builder.redirectErrorStream(true);

		Process process = builder.start();
		Executors.newSingleThreadExecutor().submit(() -> {
			new BufferedReader(new InputStreamReader(process.getInputStream())).lines().forEach(log::info);
		});
		int exitCode = process.waitFor();
		assert exitCode == 0;
	}

	private void extractFolder(File zipFile, String targetFolder, boolean createSubDirectory)
			throws ZipException, IOException {
		System.out.println(zipFile);
		int BUFFER = 1024;

		ZipFile zip = new ZipFile(zipFile);
		String fileName = zipFile.getName();
		String newPath = fileName.substring(0, fileName.length() - 4);

		new File(newPath).mkdir();
		Enumeration zipFileEntries = zip.entries();

		// Process each entry
		while (zipFileEntries.hasMoreElements()) {
			// grab a zip file entry
			ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();
			String currentEntry = entry.getName();
			File destFile = new File(targetFolder, currentEntry);
			File destinationParent = destFile.getParentFile();
			if (destinationParent != null) {
				// create the parent directory structure if needed
				destinationParent.mkdirs();
			}

			if (!entry.isDirectory()) {
				log.info("Extracting file: {} -> {}", currentEntry, destFile.getAbsolutePath());
				BufferedInputStream is = new BufferedInputStream(zip.getInputStream(entry));
				int currentByte;
				// establish buffer for writing file
				byte data[] = new byte[BUFFER];

				// write the current file to disk
				FileOutputStream fos = new FileOutputStream(destFile);
				BufferedOutputStream dest = new BufferedOutputStream(fos, BUFFER);

				// read and write until last byte is encountered
				while ((currentByte = is.read(data, 0, BUFFER)) != -1) {
					dest.write(data, 0, currentByte);
				}
				dest.flush();
				dest.close();
				is.close();
			}

			if (currentEntry.endsWith(".zip")) {
				log.info("Extracting zip file: {}", currentEntry);
				// found a zip file, try to open
				extractFolder(destFile, null, true);
			}
		}
	}

	/**
	 * Copy a file from source to destination.
	 *
	 * @param source
	 *            the source
	 * @param destination
	 *            the destination
	 * @return True if succeeded , False if not
	 */
	public static boolean copy(InputStream source, Path destination) {
		boolean success = true;
		log.info("Writing to -> " + destination);
		try {
			Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException ex) {
			log.warn("Failed to copy resource", ex);
			success = false;
		}
		return success;
	}

	public static class UiLoaderBuilder {
		SproutResourcePatternResolver resolver;
		private boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");
		private String destinationFolder = Paths.get(System.getProperty("user.home"), "sprout").toString();
		private List<String> installArgs;
		private List<String> buildArgs;
		private String zipSearchPattern = "classpath*:/**/sprout/ui/*-resources.zip";
		private String NODE_PATH = System.getenv("NODE_PATH");
		private String nodeBin = "/usr/bin/node";
		private String npmBin = "/usr/bin/npm";
		private boolean extract = false;
		private boolean compile = false;

		public UiLoaderBuilder() {

			// Get Sprout home from properties or environment if configured
			String sproutHomeEnv = System.getenv(SproutConfiguration.SPROUT_HOME_ENV);
			String sproutHomeProp = System.getProperty(SproutConfiguration.SPROUT_HOME_PROP);
			if (sproutHomeProp != null && sproutHomeProp != "") {
				destinationFolder = sproutHomeProp;
			} else if (sproutHomeEnv != null && sproutHomeEnv != "") {
				destinationFolder = sproutHomeEnv;
			}

			if (NODE_PATH != null) {
				nodeBin = String.format("%s/node", NODE_PATH);
				npmBin = String.format("%s/npm", NODE_PATH);
			} else {
				log.warn("NODE_PATH is not set");
			}

			if (isWindows) {
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
			return Arrays.asList(npmBin + ".cmd", "install");
		}

		private List<String> getLinuxBuildArgs() {
			return Arrays.asList(nodeBin, npmBin, "run", "build");
		}

		private List<String> getWindowsBuildArgs() {
			return Arrays.asList(npmBin + ".cmd", "run", "build");
		}

		public UiLoaderBuilder resolver(SproutResourcePatternResolver resolver) {
			this.resolver = resolver;
			return this;
		}

		public UiLoaderBuilder destinationFolder(String destinationFolder) {
			if(destinationFolder != null && destinationFolder != "") {
				this.destinationFolder = destinationFolder;
			}
			return this;
		}

		public UiLoaderBuilder searchPattern(String searchPattern) {
			this.zipSearchPattern = searchPattern;
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