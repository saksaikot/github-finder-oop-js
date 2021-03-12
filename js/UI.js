//utilities
const q = (id) => document.querySelector("#" + id);

//components
const userName = q("userName");
const search = q("search");
const fullName = q("fullName");
const userImage = q("userImage");
const viewProfile = q("viewProfile");
const publicRepos = q("publicRepos");
const publicGist = q("publicGist");
const followers = q("followers");
const following = q("following");
const company = q("company");
const website = q("website");
const userLocation = q("location");
const memberSince = q("memberSince");
const userContainer = q("userContainer");
const warning = q("warning");

class UI {
  constructor() {
    console.log(search);
    this.loadEvent();
  }
  loadEvent() {
    search.addEventListener("click", (e) => this.getGitUser(e));
  }
  getGitUser(e) {
    e.preventDefault();
    const name = userName.value;
    if (name == "") {
      // console.log("no input");
      this.display(userContainer, "none");
      this.display(warning, "none");
      return;
    }

    fetch(`https://api.github.com/users/${name}`)
      .then((response) => response.json())
      .then((data) => this.showUserDetails(data))
      .catch((e) => console.log(e.message));
  }
  showUserDetails(data) {
    this.display(userContainer, this.isDisplay(data.login));
    this.display(warning, this.isDisplay(!data.login));

    userImage.src = data.avatar_url;
    fullName.textContent = data.name;
    viewProfile.href = data.html_url;
    publicRepos.textContent = data.public_repos;
    publicGist.textContent = data.public_gists;
    followers.textContent = data.followers;
    following.textContent = data.following;
    company.textContent = data.company;
    website.textContent = data.html_url;
    userLocation.textContent = data.location;
    memberSince.textContent = data.created_at;
  }
  isDisplay(data) {
    return data ? "block" : "none";
  }
  display(element, display) {
    element.style.display = display;
  }
}
