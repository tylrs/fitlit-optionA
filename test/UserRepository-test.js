import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import { userTestData, sleepTestData, activityTestData, hydrationTestData } from './sampleData';

describe('userRepository', function() {
  let user, usersData, userTestRepository, necessity;
  beforeEach(() => {
    usersData = userTestData.map(user => new User(user));
    userTestRepository = new UserRepository(usersData, sleepTestData, activityTestData, hydrationTestData);
    user = userTestRepository.users[0];
  });
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
    expect(userTestRepository.calculateAverageStepGoal()).to.equal(Math.round(20000 / 3));
  })
  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    expect(userTestRepository.calculateAverageSleepQuality()).to.equal('3.58');
  });
  it('Find all users who average a sleep quality greater than 3 for a given week (7 days))', function() {
    userTestRepository.users[0].sleepQualityRecord = [{date: "2019/09/22", quality: 0.6}, {date: "2019/09/21", quality: 0.2}, {date: "2019/09/20", quality: 0.9}, {date: "2019/09/19", quality: 0.2}, {date: "2019/09/18", quality: 0.5}, {date: "2019/09/17", quality: 0.8}, {date: "2019/09/16", quality: 0.2}, {date: "2019/09/15", quality: 0.7}, {date: "2019/09/14", quality: 0.8}, {date: "2019/09/13", quality: 0.6}, {date: "2019/09/12", quality: 0.3}];
    userTestRepository.users[1].sleepQualityRecord = [{date: "2019/09/22", quality: 9.6}, {date: "2019/09/21", quality: 8.2}, {date: "2019/09/20", quality: 9.9}, {date: "2019/09/19", quality: 4.2}, {date: "2019/09/18", quality: 9.5}, {date: "2019/09/17", quality: 7.8}, {date: "2019/09/16", quality: 10.2}, {date: "2019/09/15", quality: 5.7}, {date: "2019/09/14", quality: 8.8}, {date: "2019/09/13", quality: 4.6}, {date: "2019/09/12", quality: 5.3}];
    userTestRepository.users[2].sleepQualityRecord = [{date: "2019/09/22", quality: 9.6}, {date: "2019/09/21", quality: 8.2}];
    expect(userTestRepository.findBestSleepersWeek("2019/09/22")).to.deep.equal([userTestRepository.users[1], userTestRepository.users[2]]);
  });
  it('For a given day, find the users who slept the most number of hours (one or more if they tied)', function() {
    expect(userTestRepository.findBestSleepersDay("2019/06/15")).to.deep.equal([userTestRepository.users[1], userTestRepository.users[2]]);
  });
  it('should have a method that finds the longest sleepers', function() {
    expect(userTestRepository.getSleeper("2019/06/15", "best")).to.deep.equal([userTestRepository.users[1].id, userTestRepository.users[2].id]);
  });
  it('should have a method that finds the worst sleepers', function() {
    expect(userTestRepository.getSleeper("2019/06/15", "worst")).to.deep.equal([userTestRepository.users[0].id]);
  });
  it('What is the average number of active minutes among all users for a given day', function() {
    expect(userTestRepository.calculateAverage("2019/06/15", "minutesActive")).to.equal(Math.floor((140 + 138 + 116) / 3));
  })
  it('What is the average number of steps among all users for a given day', function() {
    expect(userTestRepository.calculateAverage("2019/06/15", "steps")).to.equal((3577 + 4294 + 7402) / 3);
  })
  it('What is the average number of stairs among all users for a given day', function() {
    expect(userTestRepository.calculateAverage("2019/06/15", "flightsOfStairs")).to.equal(Math.round((16 + 10 + 33) / 3));
  })
});
