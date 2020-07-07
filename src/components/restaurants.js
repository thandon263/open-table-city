import React from "react"

const Restaurants = ({ label, children }) => {
    return (
        <React.Fragment>
            <div style={styles.container}>
                <div style={{borderTop: "1px solid #ddd",
        borderBottom: "1px solid #ddd", padding: "20px 0"}}><span style={styles.label}>{label}</span></div>
            </div>
            <div style={styles.children}>
                {children}
            </div>
        </React.Fragment>
    )
}

const styles = {
    container: {
        padding: "10px 5px"
    },
    label: { 
        textAlign: "left",
        fontSize: "20pt",
        fontFamily: "Avenir, monospace",
        fontWeight: 600,
    },
    children: {
        padding: "2% 0"
    }
}

export default Restaurants