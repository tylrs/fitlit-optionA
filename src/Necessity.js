class Necessity {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // doActivity() {
  //   var activity = this;
  //   this.userRepo.users.find(function(user) {
  //     return user.id === activity.userId;
  //   }).updateActivities(this);
  // }

  // sleep() {
  //   var sleep = this;
  //   this.userRepo.users.find(function(user) {
  //     return user.id === sleep.userId;
  //   }).updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  // }

  // drink() {
  //   var hydrate = this;
  //   this.userRepo.users.find(function(user) {
  //     return user.id === hydrate.userId;
  //   }).updateHydration(this.date, this.ounces);
  // }
}

export default Necessity;
