import database from '@react-native-firebase/database';

export const addData = async (key: string, value: string) => {
    try {
        await database()
            .ref(`/users/${key}`)
            .set({
                name: value,
                age: 20,
                timestamp: database.ServerValue.TIMESTAMP
            });
        console.log('Data added successfully!');
    } catch (error) {
        console.error(error);
    }
};

export const readData = async () => {
    try {
        const snapshot = await database().ref('/users').once('value');
        const data = snapshot.val();
        console.log('User data: ', data);
    } catch (error) {
        console.error(error);
    }
};

export const updateData = async (key: string, newValue: string) => {
    try {
        await database()
            .ref(`/users/${key}`)
            .update({
                name: newValue,
                lastUpdated: database.ServerValue.TIMESTAMP
            });
        console.log('Data updated successfully!');
    } catch (error) {
        console.error(error);
    }
};

export const deleteData = async (key: string) => {
    try {
        await database()
            .ref(`/users/${key}`)
            .remove();
        console.log('Data deleted successfully!');
    } catch (error) {
        console.error(error);
    }
};