package net.savantly.sprout.domain.branding;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/brand")
public interface BrandingApi {

	@GetMapping(path = "/favicon", produces = { 
			MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_JPEG_VALUE, "image/apng", "image/bmp", 
			"image/x-icon", "image/svg+xml", "image/tiff", "image/webp" })
	byte[] getFavicon();

	@GetMapping(path = "/logo", produces = { 
			MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_JPEG_VALUE, "image/apng", "image/bmp", 
			"image/x-icon", "image/svg+xml", "image/tiff", "image/webp" })
	byte[] getLogo();

	@GetMapping(path = "/mini-logo", produces = { 
			MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_JPEG_VALUE, "image/apng", "image/bmp", 
			"image/x-icon", "image/svg+xml", "image/tiff", "image/webp" })
	byte[] getMiniLogo();
}
