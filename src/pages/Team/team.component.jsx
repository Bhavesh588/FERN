import React from 'react';

import './team.styles.scss';

const Team = ({ team }) => {
    return(
        <div className="team bg-dark">
            <div className="teambox" data-aos="fade-up">
                <div className="title py-3">Teams</div>
                <div className="container">
                    <div className="row">
                        {
                            team.t_title.map((tit,i) => 
                                <div className="col-md py-4" key={i}>
                                    <div className="teamimg">
                                        <img src={team.t_filename[i]} className="imgte" alt="Service"/>
                                    </div>
                                    <div className="teamname py-2">{tit}</div>
                                    <div className="jobtitle py-2">{team.t_job[i]}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;