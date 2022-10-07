package com.ssafy.arthorizon.common;


import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CryptoUtil {
    public static class Sha512 {
        private Sha512() {
        }

        public static String hash(String input) {
            return Sha512.hash(input, null);
        }

        public static String hash(String input, String fallback) {
            try {
                MessageDigest messageDigest = MessageDigest.getInstance("SHA-512");
                messageDigest.reset();
                messageDigest.update(input.getBytes(StandardCharsets.UTF_8));
                return String.format("%0128x", new BigInteger(1, messageDigest.digest()));
            } catch (NoSuchAlgorithmException ignored) {
                throw new UnsupportedOperationException();
            } catch (Exception ignored) {
                return fallback;
            }
        }
    }

    public static class Sha256 {
        private Sha256() {
        }

        public static String hash(String input) {
            return Sha256.hash(input, null);
        }

        public static String hash(String input, String fallback) {
            try {
                MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
                messageDigest.reset();
                messageDigest.update(input.getBytes(StandardCharsets.UTF_8));
                return String.format("%064x", new BigInteger(1, messageDigest.digest()));
            } catch (NoSuchAlgorithmException ignored) {
                throw new UnsupportedOperationException();
            } catch (Exception ignored) {
                return fallback;
            }
        }
    }

    private CryptoUtil() {
    }
}

