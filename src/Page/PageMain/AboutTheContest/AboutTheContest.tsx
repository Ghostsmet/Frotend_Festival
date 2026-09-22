import './AboutTheContest.css'
import '../../../Components/btn.css';
import '../../../Components/text.css';
import { useNavigate } from 'react-router-dom';
function AboutTheContest() {
  const navigate = useNavigate(); 
  return (
    <div className="about-the-contest">
      <div className="container">
        <div className="leftContent">
          <h1 className="textabout">О конкурсе</h1>
          <p className="textabouth5">
                Первый Международный фестиваль-конкурс хореографического искусства «Танцы звезд» состоялся в 2012 году. Основная миссия проекта — содействие профессиональному росту участников, накопление сценического опыта, реализация творческого потенциала и расширение профессиональных связей внутри хореографического сообщества.
            Ключевое преимущество — специализация исключительно на хореографии.
             Организаторы не проводят смешанных конкурсов, что позволяет сохранить высокий профессиональный уровень и создать комфортную среду для артистов танцевальных жанров.
             </p>
             <p className="textabouth5">
            Экспертный состав:<br/>
            Члены жюри — участники, финалисты и победители телевизионных проектов («Танцы на DanceClub», «Новые Танцы»), ведущие педагоги, руководители творческих студий и авторы инновационных хореографических направлений.
            </p>
  
            <p className="textabouth7">
            Развитие:<br/>
            
            В настоящий момент ведется подготовка к запуску нового хореографического проекта «Максимальный уровень». К работе в жюри привлечены наставники телепроектов, а также хореографы-постановщики шоу «Танцы на DanceClub» и «Новые Танцы».
            </p>
          <button className="btnAbout" onClick={() => navigate('/about-competition')}>Подробнее</button>
        </div>
        <img className="reward1" src="/image 15.png" alt="Награды" />
      </div>
    </div>
  );
}
export default AboutTheContest;