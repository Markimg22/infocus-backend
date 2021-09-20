interface ITask {
  id: string;
  title: string;
  is_completed: boolean;
}

const alphabeticalOrderComparison = (a: ITask, b: ITask) => {
  if (a.title < b.title) {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
};

export { alphabeticalOrderComparison };
