import terms from './terms.json';

class ListTermService {
  async execute() {
    return terms;
  }
}

export { ListTermService };
