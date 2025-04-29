import React from 'react';
import './Footb.css'; // Importing the CSS file for styling

const newsArticles = [
    { title: "Спасибо Бектур и Марлен", date: "18.01.2025", link: "#" },
    { title: "BENVENUTO GIANLUCA CAPRARI", date: "07/18/2022", link: "#" },
    { title: "IL CORDOGLIO DEL MONZA", date: "07/14/2022", link: "#" },
    { title: "DIAW IN PRESTITO AL MODENA", date: "06/29/2022", link: "#" },
    { title: "MOROSINI IN SANGIULIANO CITY", date: "06/15/2022", link: "#" },
    { title: "WEDNESDAY 20 JULY FRIENDLY", date: "06/03/2022", link: "#" },
];

const NewsList = () => {
    return (
        <div className="news-container">
            <h1 className="news-title">Последние новости</h1>
            <ul className="news-list">
                {newsArticles.map((article, index) => (
                    <li key={index} className="news-item">
                        <a href={article.link} className="news-link">{article.title}</a> - <span className="news-date">{article.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;