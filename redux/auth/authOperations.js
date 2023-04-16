import db from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSlice } from "./authSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  currentUser,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const { updateUserProfile, authStateChange, authSingOut } = authSlice.actions;

export const registerUser =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(db, email, password);

      const user = db.currentUser;

      await updateProfile(user, {
        displayName: nickName,
      });
      const { uid, displayName } = await db.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error message", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(db, email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(db);
  dispatch(authSingOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(db, (user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(
        authStateChange({
          stateChange: true,
        })
      );
    }
  });
};
