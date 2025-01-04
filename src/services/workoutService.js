const { v4: uuid } = require('uuid');
const Workout = require("../database/Workout");

const getAllWorkouts = () => {
    try {
        const allWorkouts = Workout.getAllWorkouts();
        return allWorkouts;
    } catch (error) {
        throw error;
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = Workout.getOneWorkout(workoutId);
        return workout;
    } catch (error) {
        throw error;
    }
}

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    };
    try {
        const createdWorkout = Workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    } catch (error) {
        throw error;
    }
}

const updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
}

const deleteOneWorkout = (workoutId) => {
    const deletedWorkout = Workout.deleteOneWorkout(workoutId);
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};