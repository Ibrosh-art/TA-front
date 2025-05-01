import React from 'react'
import NewFoot from '../NewFoot'

const Footer = () => {
    return (
        <div>
            {/* Секция перед футером */}
            <div className="relative bg-blue-800 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Будьте в курсе событий!</h2>
                    <p className="text-gray-200 mb-6">
                        Подпишитесь на наши обновления и следите за новостями клуба.
                    </p>

                </div>
            </div>
            <NewFoot/>

            {/* Футер */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-4">© {new Date().getFullYear()} Дордой FC. Все права защищены.</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">НАШИ соцсети</h3>
                        <div className="flex justify-center space-x-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-500 hover:underline"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer