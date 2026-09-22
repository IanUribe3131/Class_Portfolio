// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
// TODO 2: Import third-party NPM packages (chalk)

import os, { totalmem } from 'os';
import chalk from 'chalk';
import fs from 'fs-extra'
import path from 'path';

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");
    const errorColor = chalk.bold.red;

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const cpuModel = os.cpus()[0].model;
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);
        const totalMem = (os.totalmem() / (1024 * 1024)).toFixed(0);
        const uptimeHours = (os.uptime()).toFixed(0);

        

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}      ${chalk.green.underline(platform)}`);
        console.log(`${chalk.bold("CPU model:")}      ${chalk.green(cpuModel)}`);
        console.log(`${chalk.bold("Free memory (MB):")}      ${chalk.green(chalk.underline(freeMemMB)  + " MB")}`);
        console.log(`${chalk.bold("Total memory (MB):")}      ${chalk.green(chalk.underline(totalMem)  + " MB")}`);
        console.log(`${chalk.bold("Uptime (sec):")}      ${chalk.green(chalk.underline(uptimeHours))} + "seconds`);
        

        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB | TOTALMEM: ${totalMem}MB | CPUMODEL: ${cpuModel} | UPTIME: ${uptimeHours}`;
        
        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        console.log("Writing log entry to disk...");
        const desktop = path.join(os.homedir(), 'Desktop');
        const file = path.join(desktop, 'Telemetry.txt')

        await fs.ensureFile(file);
        await fs.appendFile(file , logEntry);

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error(errorColor("Telemetry report generation failed:", error.message));
    }
}

// Execute engine
generateTelemetryReport();