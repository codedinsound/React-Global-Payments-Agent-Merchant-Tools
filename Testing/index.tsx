class DebuggingManager {
  static debuggerIsOn = false;
  static turnOn(): void {
    this.debuggerIsOn = true;
  }

  static debug(file, line, params): void {
    if (this.debuggerIsOn) console.log(file, line, ...params);
  }
}

export { DebuggingManager };
