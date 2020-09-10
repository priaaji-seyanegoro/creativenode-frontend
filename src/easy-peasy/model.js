import { action, thunk } from "easy-peasy";
import Cookie from "js-cookie";

const userModel = {
  currentUser: null,

  //set CurrenUser
  setCurrenUser: action((state, user) => {
    state.currentUser = user;
  }),
};

const podcastModel = {
  podcast: [],

  fetchPodcast: thunk(async (actions) => {
    const res = await fetch("http://localhost:5000/api/podcast/", {
      method: "get",
      headers: {
        "auth-token": Cookie.get("token"),
      },
    });

    const dataPodcast = await res.json();

    actions.setPodcast(dataPodcast.podcast);
    console.log(dataPodcast.podcast);
  }),

  setPodcast: action((state, podcast) => {
    state.podcast = podcast;
  }),

  addPodcast: action((state, podcast) => {
    state.podcast = [...state.podcast, podcast];
  }),

  removePodcast: action((state, id) => {
    state.podcast = state.podcast.filter((podcast) => podcast._id !== id);
  }),
};

export const storeModel = {
  user: userModel,
  podcast: podcastModel,
};
