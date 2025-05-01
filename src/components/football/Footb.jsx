import React from 'react';
import './Footb.css'; // Importing the CSS file for styling
import { newsArticles } from './const'; // Importing the news articles data


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