import React, { useState, useEffect } from 'react';

const Quiz = () => {
    const questions = [
        {
            question: "Quelle est la couleur du champion Zac ?",
            answers: ["Vert", "Rouge", "Bleu", "Noir"],
            correctAnswer: "Vert"
        },
        {
            question: "Quel est le nom du premier champion créé pour League of Legends ?",
            answers: ["Ashe", "Annie", "Alistar", "Amumu"],
            correctAnswer: "Annie"
        },
        {
            question: "Quel est le surnom de Ashe la flèche de givre ?",
            answers: ["Reine des glaces", "Reine des archers", "Reine des neiges", "Reine des cieux"],
            correctAnswer: "Reine des archers"
        },
        {
            question: "Quel est le nom de la compétence ultime d'Azir?",
            answers: ["Partition impériale", "Debout soldats", "Roi des sables", "En avant"],
            correctAnswer: "Partition impériale"
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showNextQuestion, setShowNextQuestion] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else {
            handleSubmit();
        }

        return () => {
            clearTimeout(timer);
        };
    }, [timeLeft]);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        clearTimeout();
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            window.alert('Bonne réponse !');
            setSelectedAnswer('');
            handleNextQuestion(); 
        } else {
            window.alert('Mauvaise réponse. Passons à la question suivante !');
            handleNextQuestion(); 
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer('');
        setShowNextQuestion(false);
        setTimeLeft(10);
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        setShowNextQuestion(false);
        setTimeLeft(10);
    };

    return (
        <div className='quiz'>
            <h1>Quiz League of Legends</h1>
            {currentQuestionIndex < questions.length ? (
                <>
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    {questions[currentQuestionIndex].answers.map((answer, index) => (
                        <button key={index} className={selectedAnswer === answer ? 'rep selected' : 'rep'} onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    ))}
                    <button className='accepter' onClick={handleSubmit}>Soumettre ma réponse</button>
                    {showNextQuestion && <button className='next' onClick={handleNextQuestion}>Question suivante</button>}
                    <h2>Temps restant : {timeLeft} secondes</h2>
                </>
            ) : (
                <>
                    <h2>Quiz terminé !</h2>
                    <h2>Votre score est de : X / {questions.length}</h2>
                    <button className='restart' onClick={handleRestartQuiz}>Recommencer</button>
                </>
            )}
        </div>
    );
};

export default Quiz;
