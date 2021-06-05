import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import Necessity from '../src/Necessity';
import { userTestData, sleepTestData, activityTestData, hydrationTestData } from './sampleData';

describe('userRepository', function() {
  let user, usersData, userTestRepository, necessity;
  // let necessity, user1, user2, user3, userTestRepository, sleep1, sleep2, sleep3, sleepData, userTestData;
  beforeEach(() => {
    usersData = userTestData.map(user => new User(user));
    userTestRepository = new UserRepository(usersData, sleepTestData, activityTestData, hydrationTestData);
    necessity = new Necessity(userTestRepository);
    sleepTestData.forEach(sleep => new Sleep(sleep));
    activityTestData.forEach(activity => new Activity(activity));
    hydrationTestData.forEach(hydration => new Hydration(hydration));
    user = userTestRepository.users[0];
    // user.findFriendsNames(userTestRepository.users);
  });

    // user1 = new User({
    //   'id': 1,
    //   'name': 'Luisa Hane',
    //   'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
    //   'email': 'Diana.Hayes1@hotmail.com',
    //   'strideLength': 4.3,
    //   'dailyStepGoal': 10000,
    //   'friends': [
    //     16,
    //     4,
    //     8
    //   ]
    // })
    // user2 = new User({
    //   "id": 2,
    //   "name": "Jarvis Considine",
    //   "address": "30086 Kathryn Port, Ciceroland NE 07273",
    //   "email": "Dimitri.Bechtelar11@gmail.com",
    //   "strideLength": 4.5,
    //   "dailyStepGoal": 5000,
    //   "friends": [
    //     9,
    //     18,
    //     24,
    //     19
    //   ]
    // })
    // user3 = new User({
    //   "id": 3,
    //   "name": "Herminia Witting",
    //   "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
    //   "email": "Elwin.Tromp@yahoo.com",
    //   "strideLength": 4.4,
    //   "dailyStepGoal": 15000,
    //   "friends": [
    //     19,
    //     11,
    //     42,
    //     33
    //   ]
    // })
    //OG code below:
    // userTestRepository = new userTestRepository();
    //userTestRepository.users.push(user1, user2, user3);
    // userTestData = [user1, user2, user3];
    // userTestRepository = new userRepository(userTestData);

    // sleep1 = new Sleep({
    //   "userID": 1,
    //   "date": "2019/06/16",
    //   "hoursSlept": 6.1,
    //   "sleepQuality": 1000
    // });
    // sleep2 = new Sleep({
    //   "userID": 2,
    //   "date": "2019/06/15",
    //   "hoursSlept": 7.3,
    //   "sleepQuality": 500
    // });
    // sleep3 = new Sleep({
    //   "userID": 3,
    //   "date": "2019/06/15",
    //   "hoursSlept": 9.3,
    //   "sleepQuality": 1.4
    // });

    // sleepData = [{
    //   "userID": 1,
    //   "date": "2019/06/15",
    //   "hoursSlept": 6.1,
    //   "sleepQuality": 100
    // }, {
    //   "userID": 2,
    //   "date": "2019/06/15",
    //   "hoursSlept": 7.3,
    //   "sleepQuality": 1500
    // }, {
    //   "userID": 3,
    //   "date": "2019/06/15",
    //   "hoursSlept": 9.3,
    //   "sleepQuality": 1.4
    // }];

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });
  it('should be an instance of user repository', function() {
    expect(userTestRepository).to.be.an.instanceof(UserRepository);
  });
  it('should hold an array of users', function() {
    expect(userTestRepository.users).to.deep.equal(usersData);
    expect(userTestRepository.users.length).to.equal(3);
  });
  it('getUser should return user object when given a user id', function() {
    expect(userTestRepository.getUser(2)).to.equal(usersData[1]);
  })
  it('calculateAverageStepGoal should return average step goal for all users', function() {
    expect(userTestRepository.calculateAverageStepGoal()).to.equal(20000 / 3);
  })
  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    expect(userTestRepository.calculateAverageSleepQuality()).to.equal((11.6 / 3).toFixed(2));
  });
  // it('should have a method that calculates friends average ounces of water for a given date', function() {
  //   expect(userTestRepository.calculateAverageDailyWater(userTestRepository.users[0], "2019/06/15")).to.equal((75 + 47) / 2)
  // });
  it('should have a method that finds the best sleepers', function() {
    expect(userTestRepository.findBestSleepers("2019/06/16")).to.deep.equal([user1, user2]);
  });

  //Original getLongestSleepers and getWorstSleepers functions
  // it('should have a method that finds the longest sleepers', function() {
  //   expect(userTestRepository.getLongestSleepers("2019/06/15")).to.equal(3);
  // });
  //
  // it('should have a method that finds the worst sleepers', function() {
  //   expect(userTestRepository.getWorstSleepers("2019/06/15")).to.equal(1);
  // });

  it('should have a method that finds the longest sleepers', function() {
    expect(userTestRepository.getSleeper("2019/06/15", "best")).to.equal(3);
  });

  it('should have a method that finds the worst sleepers', function() {
    expect(userTestRepository.getSleeper("2019/06/15", "worst")).to.equal(1);
  });

  // it('should have a method that calculates average number of stairs for users', function() {
  //   user1.activityRecord = [{date: "2019/09/17", flightsOfStairs: 10}, {date: "2019/09/17", flightsOfStairs: 15}];
  //   user2.activityRecord = [{date: "2019/09/16", flightsOfStairs: 8}, {date: "2019/09/17", flightsOfStairs: 4}];
  //   expect(userTestRepository.calculateAverageStairs("2019/09/17")).to.equal(10);
  // })
  // it('should have a method that calculates average number of steps for users', function() {
  //   user1.activityRecord = [{date: "2019/09/17", steps: 100}, {date: "2019/09/17", steps: 2000}];
  //   user2.activityRecord = [{date: "2019/09/16", steps: 9820}, {date: "2019/09/17", steps: 234}];
  //   expect(userTestRepository.calculateAverageSteps("2019/09/17")).to.equal(778);
  // })
  // it('should have a method that calculates average number of active minutes for users', function() {
  //   user1.activityRecord = [{date: "2019/09/17", minutesActive: 100}, {date: "2019/09/17", minutesActive: 20}];
  //   user2.activityRecord = [{date: "2019/09/16", minutesActive: 78}, {date: "2019/09/17", minutesActive: 12}];
  //   expect(userTestRepository.calculateAverageMinutesActive("2019/09/17")).to.equal(44);
  // })
  ///////Testers
  it('should have a method that calculates average number of active minutes for users', function() {
    user1.activityRecord = [{date: "2019/09/17", minutesActive: 100}, {date: "2019/09/17", minutesActive: 20}];
    user2.activityRecord = [{date: "2019/09/16", minutesActive: 78}, {date: "2019/09/17", minutesActive: 12}];
    expect(userTestRepository.calculateAverage("2019/09/17", "minutesActive")).to.equal(44);
  })

  it('should have a method that calculates average number of steps for users', function() {
    user1.activityRecord = [{date: "2019/09/17", steps: 100}, {date: "2019/09/17", steps: 2000}];
    user2.activityRecord = [{date: "2019/09/16", steps: 9820}, {date: "2019/09/17", steps: 234}];
    expect(userTestRepository.calculateAverage("2019/09/17", "steps")).to.equal(778);
  })

  it('should have a method that calculates average number of stairs for users', function() {
    user1.activityRecord = [{date: "2019/09/17", flightsOfStairs: 10}, {date: "2019/09/17", flightsOfStairs: 15}];
    user2.activityRecord = [{date: "2019/09/16", flightsOfStairs: 8}, {date: "2019/09/17", flightsOfStairs: 4}];
    expect(userTestRepository.calculateAverage("2019/09/17", "flightsOfStairs")).to.equal(10);
  })
});
