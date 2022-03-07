import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CLIENT_ID = "0be745489797f3011273";
const REDIRECT_URI = "http://localhost:8080/";

export default function App() {
    const [code, setCode] = useState('');
    const [activity, setActivity] = useState([]);
    const [repoView, setRepoView] = useState([]);
    const [activityClick, setActivityClick] = useState(false);
    const [repoClick, setRepoClick] = useState(false);
    useEffect(() => {
        var codeValue =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];
        console.log("code >>>>> ", codeValue);
        setCode(codeValue);
    }, [])

    // to get the list of activity 
    const getActivity = () => {
        setActivityClick(true);
        axios.get("https://api.github.com/events?per_page=80")
            .then((res) => {
                setActivity(res.data);
            });
    }
    //to get the list of repositories
    const getRepo = () => {
        setRepoClick(true);
        axios.get("https://api.github.com/repositories")
            .then((res) => {
                setRepoView(res.data);
            });
    }
    return (
        <div>
            {(code == '' || code == null) &&
                <div>
                    <a
                        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
                    >
                        <h1>Click here to proceed </h1>
                    </a>
                </div>
            }
            {(code != '' && code != null) &&
                <div>
                    <h2>
                        {/* once clicked then the click is disabled(hidden) */}
                        {!activityClick &&
                            <span onClick={getActivity}>Click to view the </span>
                        } ACTIVITY</h2>
                    <div>
                        {activity.length > 0 &&
                            <table border="1" width="50%">
                                <tbody>
                                    <tr>
                                        <th><h2>Id</h2></th>
                                        <th><h2>Activity Name</h2></th>
                                        <th><h2>Created</h2></th>
                                    </tr>
                                    {

                                        activity.map((row, index) => (
                                            <tr key={index}>
                                                <td key={"id_" + index}>{activity[index].id}</td>
                                                <td key={"name_" + index}>{activity[index].repo.name}</td>
                                                <td key={"actor_" + index}>{activity[index].created_at}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        }
                    </div>
                    <h2>
                        {/* once clicked then the click is disabled(hidden) */}
                        {!repoClick &&
                            <span onClick={getRepo}>Click to view the </span>
                        }
                        REPOSITORY</h2>
                    <div>
                        {repoView.length > 0 &&
                            <table border="1" width="50%">
                                <tbody>
                                    <tr>
                                        <th><h2>Id</h2></th>
                                        <th><h2>Repo Name</h2></th>
                                        <th><h2>Login Name</h2></th>
                                    </tr>
                                    {

                                        repoView.map((row, index) => (
                                            <tr key={index}>
                                                <td key={"id_" + index}>{repoView[index].id}</td>
                                                <td key={"name_" + index}>{repoView[index].name}</td>
                                                <td key={"owner_" + index}>{repoView[index].owner.login}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div >
            }
        </div >
    );
}
