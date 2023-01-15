export namespace FilesStorage {
	export interface IFilesStorageService {
		/**
		 * Метод для збереження файлу в файловому сховищі клієнта Minio
		 * @param {IInputFile} file - файл для збереження
		 * @param {string} folderPath - адреса для формування адреси папки, в якій буде збережено файл та назви цього файла в сховищі
		 * @returns Повертає повну адресу збереженого файлу
		 */
		putObject(file: IInputFile, folderPath?: string): Promise<string>

		/**
		 * Метод для збереження файлу в файловому сховищі клієнта Minio з автоматичним префіксом
		 * @param {IInputFile} file - файл для збереження
		 * @param {string} folderPath - адреса для формування адреси папки, в якій буде збережено файл та назви цього файла в сховищі
		 * @returns Повертає повну адресу збереженого файлу
		 */
		safePutObject(file: IInputFile, folderPath?: string): Promise<string>

		/**
		 * Метод для видалення файлу зі сховища за його повною адресою
		 * @param {string} url - повна адреса файла
		 */
		removeObject(url: string): Promise<boolean>

		/**
		 * Метод для видалення списку файлів зі сховища за їх повними адресами
		 * @param {string[]} urls - масив з повними адресами файлів
		 */
		removeObjects(urls: string[]): Promise<void>

		/**
		 * Метод для заміни файлу в сховищі новим файлом (методом видалення першого та збереженням другого)
		 * @param {string} url - повна адреса файла, який потрібно замінити
		 * @param {any} file - файл, на який треба замінити існуючий файл
		 * @param {string} folderPath - адреса для формування адреси папки, в якій буде замінюватись файл та назви цього файла в сховищі
		 * @returns Повертає повну адресу заміненого файлу
		 */
		replaceObject(url: string, file: any, folderPath: string): Promise<string>

		/**
		 * Метод для копіювання файлу в файловому сховищі
		 * @param {string} fileUrl - адреса файла в сховищі
		 * @param {string} folderPath - папка, в яку буде відбуватись копіювання
		 * @returns Повертає повну адресу скопійованого файлу
		 */
		copyObject(fileUrl: string, folderPath: string): Promise<string>

		/**
		 * Метод для збереження файлу в файловому сховищі з попередньою перевіркою типу файлу
		 * @param {IInputFile} file - файл для збереження
		 * @param {string[]} allowedTypes - масив дозволених типів
		 * @param {string} path - адреса для формування адреси папки, в якій буде збережено файл та назви цього файла в сховищі
		 * @returns Повертає повну адресу збереженого файлу
		 */
		saveWithTypeCheck(file: IInputFile, allowedTypes: string[], path?: string): void

		/**
		 * Метод для збереження файлу в приватному розділі файлового сховища
		 * @param {IInputFile} file - файл
		 * @param {string} folderPath - адреса папки в розділі для збереження файла
		 */
		putToPrivateBucket(file: IInputFile, folderPath: string): Promise<void>

		/**
		 * Метод для отримання файлу з приватного розділу файлового сховища
		 * @param {string} name - назва файла
		 * @param {string} folderPath - адреса папки в розділі, де зберігається файл
		 * @returns Повертає файл
		 */
		getFromPrivateBucket(name: string, folderPath: string)
	}

	/**
	 * Інтерфейс вхідного файла
	 */
	export interface IInputFile {
		/** Назва файлу */
		originalname: string

		/** Буфер, що містить увесьфайл  */
		buffer: any

		/** Тип контенту даного файлу */
		mimetype: string

		/** Розмір файла в байтах */
		size?: number

		/** Ширина */
		width?: number

		/** Висота */
		height?: number
	}
}

