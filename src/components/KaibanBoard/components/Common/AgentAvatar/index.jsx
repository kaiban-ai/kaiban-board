import React from 'react';
const AgentAvatar = ({ agent, size }) => {
    const avatarUrl = `https://robohash.org/${agent?.name}`;

    return (
        <div className="bg-slate-800 rounded-full ring-2 ring-slate-700">
            <img className={`rounded-full bg-slate-950/50 ${size === "xl" ? "w-11 h-11" : size === "lg" ? "w-9 h-9" : size === "md" ? "w-8 h-8" : "w-7 h-7"}`}
                src={avatarUrl} alt="agent"/>
        </div>
    );
};

export default AgentAvatar;