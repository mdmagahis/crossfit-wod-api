const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkouts = () => {
    return DB.workouts;
};

const getOneWorkout = (workoutId) => {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
        return;
    }
    return workout;
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = 
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        return
    }
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
    const workoutIndex = DB.workouts.findIndex((workout) => workout.id === workoutId);
    if (workoutIndex === -1) {
        return;
    }
    const updatedWorkout = {
        ...DB.workouts[workoutIndex],
        ...changes,
        updatedAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[workoutIndex] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout
};