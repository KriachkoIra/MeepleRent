import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, CircleGauge, Users } from "lucide-react";
import { DIFFICULTY_MAP } from "../constants";

export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`/games/${id}`).then((res) => {
            setGame(res.data);
        });

        //  коментарі
        axios.get(`/games/${id}/comments`).then((res) => {
            setComments(res.data);
        });
    }, [id]);

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const comment = {
                text: newComment,
                date: new Date().toLocaleString(),
            };
            setComments([...comments, comment]);
            setNewComment("");

            axios.post(`/games/${id}/comments`, { text: newComment });
        }
    };

    if (!game) return <div className="text-center mt-10">Завантаження...</div>;

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg--color-background  overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Game Image */}
                    <div className="w-full md:w-1/2 relative">
                        <div
                            className="w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage: `url(${game.image})`,
                                backgroundPosition: 'center',
                                objectFit: 'contain',
                            }}
                        >

                        </div>
                    </div>

                    {/* Game Details */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    Available
                                </span>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-600 text-lg leading-relaxed">{game.description}</p>
                            </div>

                            <div className="flex items-center mb-6">
                                <span className="text-2xl font-bold text-yellow-600">{game.price} грн/день</span>
                            </div>
                        </div>

                        {/* Game Stats */}
                        <div className="border-t border-b border-gray-200 py-6 my-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-blue-50 rounded-full p-3 mb-2">
                                        <Clock className="text-blue-500 text-xl" />
                                    </div>
                                    <span className="text-gray-500 text-sm">Час</span>
                                    <span className="font-medium text-gray-900">{game.time} хв</span>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-purple-50 rounded-full p-3 mb-2">
                                        <CircleGauge className="text-purple-500 text-xl" />
                                    </div>
                                    <span className="text-gray-500 text-sm">Складність</span>
                                    <span className="font-medium text-gray-900">{DIFFICULTY_MAP[game.difficulty]}</span>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-green-50 rounded-full p-3 mb-2">
                                        <Users className="text-green-500 text-xl" />
                                    </div>
                                    <span className="text-gray-500 text-sm">Гравці</span>
                                    <span className="font-medium text-gray-900">{game.minPlayers} - {game.maxPlayers}</span>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 px-6 py-2 rounded-lg bg-secondary text-white py-2 rounded-lg hover:bg-orange-300 transition-colors text-lg">
                            Забронювати гру
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Коментарі</h2>
                <div className="max-h-96 overflow-y-auto mb-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="border-b border-gray-300 py-4">
                            <p className="text-gray-800">{comment.text}</p>
                            <span className="text-sm text-gray-500">Опубліковано: {comment.date}</span>
                        </div>
                    ))}
                </div>

                {/* Add a New Comment */}
                <div className="flex flex-col">
                    <textarea
                        className="p-4 border border-gray-300 rounded-lg mb-4"
                        rows="4"
                        placeholder="Напишіть свій коментар..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        className="self-end px-6 py-2 rounded-lg bg-secondary text-white py-2 rounded-lg hover:bg-orange-300 transition-colors text-lg"
                        onClick={handleCommentSubmit}
                    >
                        Додати коментар
                    </button>
                </div>
            </div>
        </div>
    );
}
