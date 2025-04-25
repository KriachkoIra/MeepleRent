import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Send, User } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function ChatPage() {
  const { id, username, avatar } = useContext(UserContext);
  const { userId: chatUserId } = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChat, _setSelectedChat] = useState("sfasdf");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const socket = useRef();
  const selectedChatRef = useRef(selectedChat);
  const setSelectedChat = data => {
    selectedChatRef.current = data;
    _setSelectedChat(data);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch user's chats
  useEffect(() => {
    document.title = `Чат | MeepleRent`;
    const fetchChats = async () => {
      try {
        const response = await axios.get("/chats");
        setChats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // establish connection with socket
  useEffect(() => {
    socket.current = io('http://localhost:3001');

    socket.current.on('connect', () => {
      console.log('Connected to socket');
      socket.current.emit('authenticate', { userId: id });
      console.log(socket.current.id);
    });

    socket.current.on('reconnect', () => {
      console.log('Rconnected to socket');
      socket.current.emit('authenticate', { userId: id });
    });

    // On new message
    socket.current.on('new_message', (data) => {
      console.log("Received new message:", data);
      const setLastMessageAndMoveToTop = (senderId, message) => setChats(prev => {
        // move chat to the top of the list
        console.log(prev);
        const chat = prev.find(chat => chat.chatUser._id === senderId);
        chat.lastMessage = { text: message, createdAt: data.timestamp };
        const newChats = prev.filter(chat => chat.chatUser._id !== senderId);
        newChats.unshift(chat);
        return newChats;
      });

      console.log("Selected chat:", selectedChatRef.current);
      // if message is from selected chat
      if (data.senderId === selectedChatRef.current?.chatUser?._id) {
        console.log("Message is from selected chat");
        setMessages(prev => [...prev, {
          sender: { _id: data.senderId },
          text: data.message,
          createdAt: data.timestamp
        }]);

        scrollToBottom();

        setLastMessageAndMoveToTop(data.senderId, data.message);

        return;
      }

      // if message is not from selected chat, update chats state (last message, number of non readmessages)
      setLastMessageAndMoveToTop(data.senderId, data.message);


      // move chat to the top of the list
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // Triggered only on render when userChatId is passed to select chat or create new chat
  useEffect(() => {
    const selectChat = async () => {
      if (chatUserId && chatUserId !== id) {
        try {
          // if chat already exists, select it
          const existingChat = chats.find(chat =>
            chat.chatUser._id === chatUserId
          );

          if (existingChat) {
            setSelectedChat(existingChat);
            console.log("Selected existing chat on render:", existingChat);
            return;
          }

          const chatUser = await axios.get(`/users/${chatUserId}`);
          console.log(chatUser.data);

          const tempChat = {
            _id: 'temp_' + Date.now(),
            chatUser: {
              _id: chatUser.data._id,
              username: chatUser.data.username,
              avatar: chatUser.data.avatar
            },
            messages: [],
            isTemporary: true // Flag to indicate this is a temporary chat
          };
          setSelectedChat(tempChat);
          console.log("Selected temp chat on render:", tempChat);

          // You can optionally add this to the chats list
          setChats(prevChats => [tempChat, ...prevChats]);
        } catch (error) {
          console.error("Error starting chat:", error);
        }
      }
    };

    if (!loading && chatUserId) {
      selectChat();
    }
  }, [chatUserId, loading]);

  // Triggered after setSelectedChat() and fetches messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        if (selectedChat.isTemporary) {
          setMessages([]);
          return;
        }
        document.title = `Чат з ${selectedChat.chatUser.username} | MeepleRent`;
        try {
          const response = await axios.get(`/chats/${selectedChat._id}/messages`);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
    console.log("Selected chat on fetch messages:", selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedChat) return;

    try {
      if (selectedChat.isTemporary) {
        const responseMessage = await axios.post(`/messages`, {
          text: newMessage,
          recepientId: selectedChat.chatUser._id
        });
        selectedChat._id = responseMessage.data.chat._id;
        selectedChat.lastMessage = { text: newMessage, createdAt: responseMessage.data.createdAt };
        setSelectedChat(selectedChat);
      } else {
        await axios.post(`/messages`, {
          text: newMessage,
          chatId: selectedChat._id
        });
      }

      // Refresh messages
      const response = await axios.get(`/chats/${selectedChat._id}/messages`);
      setMessages(response.data);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatSelect = (chat) => {
    // Update draft for the selected chat
    const newChats = chats.map(chat => {
      if (chat._id === selectedChat?._id) {
        return { ...chat, draft: newMessage };
      }
      return chat;
    });
    setNewMessage(chat.draft);
    setChats(newChats);
    console.log("Selected chat:", chat);
    setSelectedChat(chat);
    if (chatUserId) {
      navigate("/chat");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="text-xl">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Chat List Sidebar */}
      <div className="w-1/4 border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Мої чати</h2>
        {chats.length === 0 ? (
          <p className="text-gray-500">У вас поки немає чатів</p>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`p-3 rounded-lg cursor-pointer overflow-hidden ${selectedChat?._id === chat._id
                  ? "bg-secondary text-white"
                  : "hover:bg-gray-100"
                  }`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="flex items-center">
                  {chat.chatUser?.avatar ? (
                    <img
                      src={chat.chatUser?.avatar}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <User className="text-gray-500" />
                    </div>
                  )}
                  <div className="w-full max-w-[100%] flex flex-col">
                    <div className="flex justify-between items-center max-w-[100%] w-[50%]">
                      <p className="font-medium">
                        {chat.chatUser?.username}
                      </p>
                    </div>
                    {chat.draft && (
                      <div className="flex justify-between items-center text-sm w-full max-w-[full] ">
                        <p className="text-gray-500 text-overflow-ellipsis overflow-hidden">
                          Чернетка: {chat.draft}
                        </p>
                      </div>
                    )}
                    {!chat.draft &&
                      chat.lastMessage && (
                        <div className="flex justify-between items-center text-sm flex-grow">
                          <p className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap min-w-0 truncate">{chat.lastMessage.text}</p>
                          <p className="text-xs text-gray-500 ml-2 min-w-[fit-content] whitespace-nowrap text-overflow-ellipsis flex-shrink-0 mr-1">
                            {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center">
              {selectedChat.chatUser?.avatar ? (
                <img
                  src={selectedChat.chatUser?.avatar}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <User className="text-gray-500" />
                </div>
              )}
              <h3 className="text-lg font-medium">
                {selectedChat.chatUser?.username}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`mb-4 flex ${message.sender._id === id ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${message.sender._id === id
                      ? "bg-secondary text-white"
                      : "bg-gray-100"
                      }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Напишіть повідомлення..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-secondary"
                />
                <button
                  type="submit"
                  className="bg-secondary text-white p-2 rounded-r-lg hover:bg-orange-300 transition-colors"
                >
                  <Send color="white" className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-xl">Виберіть чат для спілкування</p>
          </div>
        )}
      </div>
    </div>
  );
} 