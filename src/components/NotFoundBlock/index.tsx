import style from "./NotFound.module.scss";

const NotFoundBlock = () => {
	return (
		<div className={style.notFound}>
			<h1>ОШИБКА 404</h1>
			<h2>Страницы не существует</h2>
		</div>
	)
}

export default NotFoundBlock;