import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="mb-12"></div>
            <div className="relative bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Будьте в курсе событий!</h2>
                    <p className="text-gray-400 mb-6">
                        Подпишитесь на наши обновления и следите за новостями клуба.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
                        {/* Соцсети */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-lg transition transform text-center"
                        >
                            <i className="fab fa-facebook-f text-2xl"></i>
                            <p className="mt-2">Facebook</p>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 hover:shadow-lg transition transform text-center"
                        >
                            <i className="fab fa-twitter text-2xl"></i>
                            <p className="mt-2">Twitter</p>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 hover:scale-105 hover:shadow-lg transition transform text-center"
                        >
                            <i className="fab fa-instagram text-2xl"></i>
                            <p className="mt-2">Instagram</p>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 hover:shadow-lg transition transform text-center"
                        >
                            <i className="fab fa-youtube text-2xl"></i>
                            <p className="mt-2">YouTube</p>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 hover:shadow-lg transition transform text-center"
                        >
                            <i className="fab fa-linkedin-in text-2xl"></i>
                            <p className="mt-2">LinkedIn</p>
                        </a>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Навигация */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Навигация</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="hover:underline">
                                    О клубе
                                </a>
                            </li>
                            <li>
                                <a href="/team" className="hover:underline">
                                    Команда
                                </a>
                            </li>
                            <li>
                                <a href="/schedule" className="hover:underline">
                                    Расписание
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:underline">
                                    Контакты
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                        <p>г. Бишкек, ул. Спортивная, 123</p>
                        <p>Телефон: +996 (312) 123-456</p>
                        <p>Email: info@fcdordoi.kg</p>
                    </div>

                    {/* Подписка */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Подписка на новости</h3>
                        <p className="mb-4">
                            Подпишитесь на нашу рассылку, чтобы получать последние новости и обновления.
                        </p>
                        <form>
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="w-full p-2 rounded mb-2 text-gray-900"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                            >
                                Подписаться
                            </button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p>© {new Date().getFullYear()} Дордой FC. Все права защищены.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer