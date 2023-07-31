package com.m4l0n.kneadly.service;

import java.io.IOException;
import java.util.List;

public interface TestService {
    String readFile() throws IOException;

    List<String> listFiles() throws IOException;
}
