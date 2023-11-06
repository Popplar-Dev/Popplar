package com.popplar.gameservice.entity;

public enum GameType {
    FIGHTING, REFLEXES;

    public static boolean isValidGameType(String type) {
        try {
            valueOf(type);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
