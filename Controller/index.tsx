class LocalStorageWorker {
  static load(): any[] {
    let items: any[] = [];
    const retrivedStorage: string = localStorage.getItem('history');

    if (retrivedStorage !== null) items = [...JSON.parse(retrivedStorage)];

    console.log(items);

    return items;
  }

  static store(data: any[]): void {
    console.log(data);
    localStorage.setItem('history', JSON.stringify(data));
  }
}

// static store() {}

export { LocalStorageWorker };
