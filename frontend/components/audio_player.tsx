interface AudioPlayerProps {
  src: string;
  title: string; //Optional
  author: string; //Optional
}

export default function AudioPlayer({ src, title, author }: AudioPlayerProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      {title && <h3 className="text-lg font-semibold">{title}</h3>} //if title is passed, render it
            {author && <p className="text-sm text-gray-500">{author}</p>}
            <audio controls className="w-full mt-2">
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}