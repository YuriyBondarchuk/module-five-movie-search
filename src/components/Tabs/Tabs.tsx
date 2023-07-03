import { useState } from "react";
import "./Tabs.scss";

interface TabsProps {
    children: any;
    tabs: string[];
    emitActiveTab: (tab: string) => void;
}

function Tabs(props: TabsProps) {
    const [activeTab, setActiveTab] = useState<string>(props.tabs[0]);

    const setActive = (tab: string): void => {
        setActiveTab(tab);
    };

    return (
        <div className="tab">
            <div className="tab-header">
                {props.tabs.map((tab, index) => (
                    <div 
                        key={index}
                        className={
                            tab === activeTab
                                ? "tab-item tab-active"
                                : "tab-item"
                        }
                        onClick={() => {
                            setActive(tab);
                            props.emitActiveTab(tab);
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className="tab-body">{props.children}</div>
        </div>
    );
}

export default Tabs;
