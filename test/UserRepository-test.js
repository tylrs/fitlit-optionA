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
    // necessity = new Necessity(userTestRepository);
      // console.log(userTestRepository);
    // sleepTestData.forEach(sleep => new Sleep(sleep, userTestRepository));
    // activityTestData.forEach(activity => new Activity(activity, userTestRepository));
    // console.log(activityTestData[0])
    // hydrationTestData.forEach(hydration => new Hydration(hydration, userTestRepository));
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
  it('should return user when given a user id', function() {
    expect(userTestRepository.getUser(2)).to.equal(usersData[1]);
  })

  it('should update all users info based on sleep data', function() {
    expect(userTestRepository.users[0].sleepQualityRecord.length).to.equal(0);
    expect(userTestRepository.users[0].sleepHoursRecord.length).to.equal(0);

    userTestRepository.updateUsersSleep()

    expect(userTestRepository.users[0].sleepQualityRecord.length).to.equal(3);
    expect(userTestRepository.users[0].sleepHoursRecord.length).to.equal(3);
  })

  it('should update all users info based on hydration data', function() {
    expect(userTestRepository.users[0].ouncesRecord.length).to.equal(0);

    userTestRepository.updateUsersHydration()

    expect(userTestRepository.users[0].ouncesRecord.length).to.equal(3);
  })

  it('should update all users info based on activity data', function() {
    expect(userTestRepository.users[0].activityRecord.length).to.equal(0);

    userTestRepository.updateUsersActivity()

    expect(userTestRepository.users[0].activityRecord.length).to.equal(3);
  })

  it('calculateAverageStepGoal should return average step goal for all users', function() {
    expect(userTestRepository.calculateAverageStepGoal()).to.equal(20000 / 3);
  })
  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    // userTestRepository.updateUsersSleep()
    expect(userTestRepository.calculateAverageSleepQuality()).to.equal('3.58');
  });
  // it('should have a method that calculates friends average ounces of water for a given date', function() {
  //   expect(userTestRepository.calculateAverageDailyWater(userTestRepository.users[0], "2019/06/15")).to.equal((75 + 47) / 2)
  // });
  it('Find all users who average a sleep quality greater than 3 for a given week (7 days))', function() {
    userTestRepository.users[0].sleepQualityRecord = [{date: "2019/09/22", quality: 0.6}, {date: "2019/09/21", quality: 0.2}, {date: "2019/09/20", quality: 0.9}, {date: "2019/09/19", quality: 0.2}, {date: "2019/09/18", quality: 0.5}, {date: "2019/09/17", quality: 0.8}, {date: "2019/09/16", quality: 0.2}, {date: "2019/09/15", quality: 0.7}, {date: "2019/09/14", quality: 0.8}, {date: "2019/09/13", quality: 0.6}, {date: "2019/09/12", quality: 0.3}];
    userTestRepository.users[1].sleepQualityRecord = [{date: "2019/09/22", quality: 9.6}, {date: "2019/09/21", quality: 8.2}, {date: "2019/09/20", quality: 9.9}, {date: "2019/09/19", quality: 4.2}, {date: "2019/09/18", quality: 9.5}, {date: "2019/09/17", quality: 7.8}, {date: "2019/09/16", quality: 10.2}, {date: "2019/09/15", quality: 5.7}, {date: "2019/09/14", quality: 8.8}, {date: "2019/09/13", quality: 4.6}, {date: "2019/09/12", quality: 5.3}];
    userTestRepository.users[2].sleepQualityRecord = [{date: "2019/09/22", quality: 9.6}, {date: "2019/09/21", quality: 8.2}];
    expect(userTestRepository.findBestSleepersWeek("2019/09/22")).to.deep.equal([userTestRepository.users[1], userTestRepository.users[2]]);
  });
  it('For a given day, find the users who slept the most number of hours (one or more if they tied)', function() {
    expect(userTestRepository.findBestSleepersDay("2019/06/15")).to.deep.equal([userTestRepository.users[1], userTestRepository.users[2]]);
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
    expect(userTestRepository.getSleeper("2019/06/15", "best")).to.deep.equal([userTestRepository.users[1].id, userTestRepository.users[2].id]);
  });

  it('should have a method that finds the worst sleepers', function() {
    expect(userTestRepository.getSleeper("2019/06/15", "worst")).to.deep.equal([userTestRepository.users[0].id]);
  });
  // it('should have a method that calculates average number of stairs for users', function() {
    // user1.activityRecord = [{date: "2019/09/17", flightsOfStairs: 10}, {date: "2019/09/17", flightsOfStairs: 15}];
    // user2.activityRecord = [{date: "2019/09/16", flightsOfStairs: 8}, {date: "2019/09/17", flightsOfStairs: 4}];
    // expect(userTestRepository.calculateAverageStairs("2019/09/17")).to.equal(10);
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
  it('What is the average number of active minutes among all users for a given day', function() {
    expect(userTestRepository.calculateAverage("2019/06/15", "minutesActive")).to.equal((140 + 138 + 116) / 3);
  })
  it('What is the average number of steps among all users for a given day', function() {
    expect(userTestRepository.calculateAverage("2019/06/15", "steps")).to.equal((3577 + 4294 + 7402) / 3);
  })
  it('What is the average number of stairs among all users for a given day', function() {
    expect(userTestRepository.calculateAverage("2019/06/15", "flightsOfStairs")).to.equal((16 + 10 + 33) / 3);
  })
});
