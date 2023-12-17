'use client';

const sessionLength: number = 12 * 60 * 60; // 12 hours
const expirationTimeKey = 'expirationTime';
const sessionDataKey = 'sessionData';

class SessionManager {
    private static instance: SessionManager;

    public expirationTime: number;
    private data: Record<string, any>;

    private constructor() {
        this.expirationTime = this.loadExpirationTime();
        this.data = this.loadSessionData();
    }

    public static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    public set(key: string, value: any): void {
        this.data[key] = value;
        this.saveSessionData();
    }

    public get(key: string): any {
        return this.data[key];
    }

    public clear(): void {
        this.data = {};
        this.expirationTime = Date.now() + sessionLength * 1000;
        this.clearSessionData();
        this.saveExpirationTime();
    }

    public hasExpired(): boolean {
        return Date.now() >= this.expirationTime;
    }

    private saveSessionData(): void {
        localStorage.setItem(sessionDataKey, JSON.stringify(this.data));
    }

    private loadSessionData(): Record<string, any> {
        const sessionData = localStorage.getItem(sessionDataKey);
        return sessionData ? JSON.parse(sessionData) : {};
    }

    private saveExpirationTime(): void {
        localStorage.setItem(expirationTimeKey, JSON.stringify(this.expirationTime));
    }

    private loadExpirationTime(): number {
        const expirationTime = localStorage.getItem(expirationTimeKey);
        if (expirationTime) {
            const time = JSON.parse(expirationTime);
            if (time <= Date.now()) {
                this.clearSessionData();
            }
            return time;
        }
        return Date.now() + sessionLength * 1000;
    }

    private clearSessionData(): void {
        localStorage.removeItem(sessionDataKey);
    }
}

export default SessionManager;