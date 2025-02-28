'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE_URL = 'http://localhost:5000';

const LegalSummarization = () => {
    const [file, setFile] = useState<File | null>(null);
    const [context, setContext] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Array<{role: string, content: string}>>([]);
    const [loading, setLoading] = useState(false);

    const MessageSkeleton = () => (
        <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-[40px] w-3/4" />
            <Skeleton className="h-[40px] w-1/2" />
        </div>
    );

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            try {
                setLoading(true);
                const { data } = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                setContext(data.text);
                setChat([{ role: 'assistant', content: data.summary }]);
            } catch (error) {
                console.error('Upload error:', error);
                alert(error.response?.data?.error || 'Failed to upload and process the document');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        try {
            setLoading(true);
            const { data } = await axios.post(`${API_BASE_URL}/api/chat`, {
                message,
                context
            });
            
            setChat([...chat, 
                { role: 'user', content: message },
                { role: 'assistant', content: data.response }
            ]);
            setMessage('');
        } catch (error) {
            console.error('Chat error:', error);
            alert(error.response?.data?.error || 'Failed to get response from the server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
                Legal Document Summarization
            </h1>
            
            <div className="mb-8">
                <Input 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                />
            </div>

            <div className="chat-container h-[500px] overflow-y-auto border rounded-lg p-4 mb-4">
                {chat.map((msg, index) => (
                    <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg p-4 max-w-[80%] ${
                            msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && <MessageSkeleton />}
            </div>

            <div className="flex gap-2">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about the document..."
                    disabled={!context}
                    className="flex-1"
                />
                <Button
                    onClick={handleSendMessage}
                    disabled={!context || loading}
                    variant="default"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                            Processing...
                        </div>
                    ) : 'Send'}
                </Button>
            </div>
        </div>
    );
};

export default LegalSummarization;