import axios from 'axios/index';
import config from '../../config';

export function fetchData(user, repo) {
    const repoData = {
        commitActivity: [],
        codeFrequency: [],
        punchCard: []
    };
    const promises = [];

    promises.push(axios.get(`https://api.github.com/repos/${user}/${repo}/stats/code_frequency`, {
        params: {
            access_token: config.token
        }})
        .then(response => repoData.codeFrequency = response.data));
    promises.push(axios.get(`https://api.github.com/repos/${user}/${repo}/stats/commit_activity`, {
        params: {
            access_token: config.token
        }})
        .then(response => repoData.commitActivity = response.data));
    promises.push(axios.get(`https://api.github.com/repos/${user}/${repo}/stats/punch_card`, {
        params: {
            access_token: config.token
        }})
        .then(response => repoData.punchCard = response.data));

    return Promise.all(promises)
        .then(() => repoData);
}