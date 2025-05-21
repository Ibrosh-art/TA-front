import { useState } from "react";

export default function PrivacyPolicyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Политика конфиденциальности
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Политика конфиденциальности</h2>
            <p className="text-sm text-gray-600 mb-2">
              Дата последнего обновления: 20 мая 2025 года
            </p>

            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                Салымбеков Университет (далее — «мы», «наш» или «Университет») уважает вашу конфиденциальность. В этой политике конфиденциальности мы объясняем, какие данные мы собираем через наш сайт, как мы их используем и какие у вас есть права.
              </p>

              <h3 className="text-lg font-semibold">1. Какие данные мы собираем</h3>
              <ul className="list-disc list-inside">
                <li>Имя, номер телефона, email</li>
                <li>Информация из форм обратной связи и заявок</li>
                <li>IP-адрес, cookies, данные браузера</li>
              </ul>

              <h3 className="text-lg font-semibold">2. Как мы используем данные</h3>
              <p>
                Для обработки заявок, связи с вами, улучшения сайта и внутренней аналитики.
              </p>

              <h3 className="text-lg font-semibold">3. Передача данных</h3>
              <p>
                Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных законом или с вашего согласия.
              </p>

              <h3 className="text-lg font-semibold">4. Cookies</h3>
              <p>
                Наш сайт использует cookies. Вы можете отключить их в настройках браузера.
              </p>

              <h3 className="text-lg font-semibold">5. Безопасность данных</h3>
              <p>
                Мы применяем технические меры для защиты информации от несанкционированного доступа.
              </p>

              <h3 className="text-lg font-semibold">6. Хранение данных</h3>
              <p>
                Мы храним данные только столько, сколько это необходимо для указанных целей.
              </p>

              <h3 className="text-lg font-semibold">7. Права пользователя</h3>
              <p>
                Вы имеете право запросить доступ, изменение или удаление ваших данных, а также отозвать согласие на их обработку.
              </p>

              <h3 className="text-lg font-semibold">8. Контакты</h3>
              <p>
                Email: info@salymbekovuniversity.kg <br />
                Телефон: +996 [xxx] [xx-xx-xx] <br />
                Сайт: www.salymbekovuniversity.kg
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
