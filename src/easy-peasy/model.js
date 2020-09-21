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
  currentPodcast: [],
  isLoading: true,

  fetchPodcast: thunk(async (actions) => {
    actions.setIsLoading(true);
    actions.setPodcast([]);
    const res = await fetch("http://localhost:5000/api/podcast/", {
      method: "get",
      headers: {
        "auth-token": Cookie.get("token"),
      },
    });

    const dataPodcast = await res.json();

    if (dataPodcast) {
      actions.setPodcast(dataPodcast.podcast);
      actions.setIsLoading(false);
    }
  }),

  fetchTrendingPodcast: thunk(async (actions) => {
    actions.setIsLoading(true);
    actions.setPodcast([]);
    const res = await fetch("http://localhost:5000/api/podcast/trending", {
      method: "get",
    });

    const dataPodcast = await res.json();

    if (dataPodcast) {
      actions.setPodcast(dataPodcast.podcast);
      actions.setIsLoading(false);
    }
  }),

  fetchYourPodcast: thunk(async (actions) => {
    actions.setIsLoading(true);
    actions.setPodcast([]);
    const res = await fetch("http://localhost:5000/api/podcast/yourPodcast", {
      method: "get",
      headers: {
        "auth-token": Cookie.get("token"),
      },
    });

    const dataPodcast = await res.json();

    if (dataPodcast) {
      actions.setPodcast(dataPodcast.podcast);
      actions.setIsLoading(false);
    }
  }),

  fetchPodcastById: thunk(async (actions, id) => {
    actions.setIsLoading(true);
    const response = await fetch(`http://localhost:5000/api/podcast/${id}`, {
      method: "get",
      headers: {
        "auth-token": Cookie.get("token"),
      },
    });

    const dataPodcast = await response.json();
    if (dataPodcast) {
      actions.setCurrentPodcast(dataPodcast);
      actions.setIsLoading(false);
      console.log(dataPodcast);
    }
  }),

  setIsLoading: action((state, loading) => {
    state.isLoading = loading;
  }),

  setCurrentPodcast: action((state, podcast) => {
    state.currentPodcast = podcast;
  }),

  setFollowPodcast: action((state) => {
    state.currentPodcast.hasFollow = true;
  }),

  setUnFollowPodcast: action((state) => {
    state.currentPodcast.hasFollow = false;
  }),

  setLikePodcast: action((state) => {
    state.currentPodcast.likes = state.currentPodcast.likes + 1;
    state.currentPodcast.hasLike = true;
  }),

  setUnLikePodcast: action((state) => {
    state.currentPodcast.likes = state.currentPodcast.likes - 1;
    state.currentPodcast.hasLike = false;
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
