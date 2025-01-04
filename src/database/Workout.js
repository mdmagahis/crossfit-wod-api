const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkouts = () => {
    try {
        return DB.workouts;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 404,
                message: `Workout with ID '${workoutId}' not found`,
            };
        }
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = 
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name '${newWorkout.name}' already exists`,
        };
    }
    try {

        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
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

const deleteOneWorkout = (workoutId) => {
    const workoutIndex = DB.workouts.findIndex((workout) => workout.id === workoutId);
    if (workoutIndex === -1) {
        return;
    }
    const deletedWorkout = DB.workouts.splice(workoutIndex, 1);
    saveToDatabase(DB);
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};