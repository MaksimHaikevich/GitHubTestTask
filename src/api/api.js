class GitAPI {
  _apiBase = "https://api.github.com/";

  _transformUser = (user) => {
    return {
      id: user.id,
      login: user.login,
      name: user.name,
      avatar: user.avatar_url,
      url: user.html_url,
      followersCount: user.followers,
      followingCount: user.following,
      publicRepositories: user.public_repos,
    };
  };
  _transformRepositories = (repo) => {
    return {
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    };
  };
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllRepositories = async (username, currentPage, perPage) => {
    const res = await this.getResource(
      `users/${username}/repos?page=${currentPage}&per_page=${perPage}`
    );
    return res.map(this._transformRepositories);
  };

  getUser = async (username) => {
    const person = await this.getResource(`users/${username}`);
    return this._transformUser(person);
  };
}

export default new GitAPI();
