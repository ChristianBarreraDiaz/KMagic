// // logger.ts
// import winston from "@/lib/winston";
// import path from "node:path";

// enum LogLabel {
//   HOME = "Home",
//   OTHER = "Other",
//   // Add more labels as needed
// }

// const { combine, timestamp, label, printf } = winston.format;

// const format = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

// const logFilePath = path.join("src", "app", "app.log");

// const logger = winston.createLogger({
//   level: "info",
//   format: combine(label({ label: LogLabel.HOME }), timestamp(), format),
//   transports: [new winston.transports.File({ filename: logFilePath })],
// });

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//   );
// }

// export { logger, LogLabel };

// logger.ts
import winston, { Logger, LeveledLogMethod } from "@/lib/winston";
import path from "node:path";

enum LogLabel {
  HOME = "Home",
  OTHER = "Other",
  // Add more labels as needed
}

const { combine, timestamp, label, printf } = winston.format;

const format = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logFilePath = path.join("src", "app", "app.log");

let loggerInstance: Logger | null = null;

// Set to track executed log statements
const executedLogs = new Set<string>();

const initializeLogger = () => {
  loggerInstance = winston.createLogger({
    level: "info",
    format: combine(label({ label: LogLabel.HOME }), timestamp(), format),
    transports: [new winston.transports.File({ filename: logFilePath })],
  });

  if (process.env.NODE_ENV !== "production") {
    loggerInstance.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }
};

const getLogger = (): LeveledLogMethod & {
  [key: string]: LeveledLogMethod;
} => {
  if (!loggerInstance) {
    initializeLogger();
  }

  const leveledLogMethod: any = loggerInstance;

  return {
    ...leveledLogMethod,
    info: (message: string, meta?: any) => {
      const logKey = `${message}${JSON.stringify(meta) || ""}`;
      if (!executedLogs.has(logKey)) {
        leveledLogMethod.info(message, meta);
        executedLogs.add(logKey);
      }
    },
    // Add other log methods as needed (warn, error, etc.)
  };
};

// Dispose HMR data to reset the initialization flag and executed logs during hot reloads
if (module.hot) {
  module.hot.dispose(() => {
    loggerInstance = null;
    executedLogs.clear();
  });
}

export { getLogger as logger, LogLabel };

// example

// import { logger, LogLabel } from "@/lib/logger";

// export default function Home() {
//   const loggerInstance = logger();
//   loggerInstance.info("Home Page called", { label: LogLabel.HOME });
// }

// logger.ts
// import winston, { Logger } from "@/lib/winston";
// import path from "node:path";

// enum LogLabel {
//   HOME = "Home",
//   OTHER = "Other",
//   // Add more labels as needed
// }

// const { combine, timestamp, label, printf } = winston.format;

// const format = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

// const logFilePath = path.join("src", "app", "app.log");

// // Singleton pattern for the logger
// let loggerInstance: Logger | null = null;

// const getLogger = (): Logger => {
//   if (!loggerInstance) {
//     loggerInstance = winston.createLogger({
//       level: "info",
//       format: combine(label({ label: LogLabel.HOME }), timestamp(), format),
//       transports: [new winston.transports.File({ filename: logFilePath })],
//     });

//     if (process.env.NODE_ENV !== "production") {
//       loggerInstance.add(
//         new winston.transports.Console({
//           format: winston.format.simple(),
//         }),
//       );
//     }
//   }

//   return loggerInstance;
// };

// export { getLogger as logger, LogLabel };
