package com.rentup.mapper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Component
public class ByteToMultipartFileConverter {

    public static MultipartFile convert(byte[] bytes) {
        // Create a ByteArrayResource from the byte array
        ByteArrayResource resource = new ByteArrayResource(bytes);

        // Return a MultipartFile using the ByteArrayResource with a default file name
        return new CustomMultipartFile(resource);
    }

    // Custom implementation of MultipartFile
    static class CustomMultipartFile implements MultipartFile {

        private final ByteArrayResource resource;

        public CustomMultipartFile(ByteArrayResource resource) {
            this.resource = resource;
        }

        @Override
        public String getName() {
            return null;
        }

        @Override
        public String getOriginalFilename() {
            return "file"; // Default file name
        }

        @Override
        public String getContentType() {
            // You can set the content type based on the file type
            return "application/octet-stream"; // Example content type for binary files
        }

        @Override
        public boolean isEmpty() {
            // TODO Auto-generated method stub
            return false;
        }

        @Override
        public long getSize() {
            // TODO Auto-generated method stub
            return 0;
        }

        @Override
        public byte[] getBytes() throws IOException {
            // TODO Auto-generated method stub
            return null;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            // TODO Auto-generated method stub
            return null;
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException {
            // TODO Auto-generated method stub

        }

    }
}

