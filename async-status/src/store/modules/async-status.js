export const apiStatusActions = {
  DELAYED_STATUS: 'delayedStatus',
  SET_INIT_STATUS: 'setInitStatus',
  SET_BUSY_STATUS: 'setBusyStatus',
  SET_ERROR_STATUS: 'setErrorStatus',
  SET_SUCCESS_STATUS: 'setSuccessStatus',
};

export const apiStatusTypes = {
  INIT: 'INIT',
  BUSY: 'BUSY',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
};

export default (configuration) => {
  const prefix = configuration.getterPrefix;
  const suffix = configuration.stateSuffix;

  const mutationTypes = {
    UPDATE_INIT: 'UPDATE_INIT',
    UPDATE_BUSY: 'UPDATE_BUSY',
    UPDATE_FAILED: 'UPDATE_FAILED',
    UPDATE_SUCCESS: 'UPDATE_SUCCESS',
    DELAYED_MUTATION: 'DELAYED_MUTATION',
  };

  // Internal function to set and clear delay timers
  const updateDelayedTimers = (commit, delayedFlagData, initTimers) => {
    const { flag, mutation } = delayedFlagData;

    Object.entries(initTimers).forEach(([timerName, timer]) => {
      if (timerName === flag) {
        clearTimeout(timer);
      }
    });

    initTimers[flag] = setTimeout(() => commit(mutation, { flag }), 3000);
    return initTimers;
  };

  // Generate obj holding all the passed flags and set to init state
  const flagsStateObj = configuration.flags.reduce((obj, flag) => {
    const flagName = `${flag}${suffix}`;
    obj[flagName] = apiStatusTypes.INIT;
    return obj;
  }, {});

  // Merge flags and internal state
  const statusState = Object.assign({}, flagsStateObj, {
    initTimers: {},
  });

  // Build getters based on flags and config
  const statusGetters = Object.keys(flagsStateObj).reduce((obj, flag) => {
    const flagName = flag.charAt(0).toUpperCase() + flag.slice(1);
    const flagGetter = `${prefix}${flagName}`;
    obj[flagGetter] = state => state[flag];
    return obj;
  }, {});

  // Action types
  const statusActions = {
    flagInitStatus({ commit }, flag) {
      commit(mutationTypes.UPDATE_FLAG_INIT, { flag });
    },
    flagBusyStatus({ commit }, flag) {
      commit(mutationTypes.UPDATE_FLAG_BUSY, { flag });
    },
    flagSuccessStatus({ commit, dispatch }, flag) {
      commit(mutationTypes.UPDATE_FLAG_SUCCESS, { flag });
      dispatch(apiStatusActions.DELAYED_FLAG, {
        flag,
        mutation: mutationTypes.UPDATE_FLAG_INIT,
      });
    },
    flagErrorStatus({ commit, dispatch }, flag) {
      commit(mutationTypes.UPDATE_FLAG_FAILED, { flag });
      dispatch(apiStatusActions.DELAYED_FLAG, {
        flag,
        mutation: mutationTypes.UPDATE_FLAG_INIT,
      });
    },
    delayedInitMutation({ commit, state }, delayedFlagData) {
      const delayedTimers = updateDelayedTimers(commit, delayedFlagData, state.initTimers);
      commit(mutationTypes.DELAYED_INIT_MUTATION, { delayedTimers });
    },
  };

  // Mutation types
  const statusMutations = {
    [mutationTypes.UPDATE_FLAG_INIT](state, { flag }) {
      state[flag] = apiStatusTypes.INIT;
    },
    [mutationTypes.UPDATE_FLAG_BUSY](state, { flag }) {
      state[flag] = apiStatusTypes.BUSY;
    },
    [mutationTypes.UPDATE_FLAG_SUCCESS](state, { flag }) {
      state[flag] = apiStatusTypes.SUCCESS;
    },
    [mutationTypes.UPDATE_FLAG_FAILED](state, { flag }) {
      state[flag] = apiStatusTypes.FAILED;
    },
    [mutationTypes.DELAYED_INIT_MUTATION](state, { delayedTimers }) {
      state.initTimers = delayedTimers;
    },
  };

  // Export the configured module
  return {
    state: statusState,
    getters: statusGetters,
    actions: statusActions,
    mutations: statusMutations,
  };
};
