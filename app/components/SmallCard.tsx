import Image from "next/image";

interface SmallCardProps {
    heading : string,
    images : string
}
export default function SmallCard({heading, images}: SmallCardProps) {
    return (
        <div className="flex flex-col justify-center">
            <Image className="" src={images} alt={heading} width={100} height={100} /> {/* Add width and height */}
            <h1 className="flex text-customblue justify-center my-2">{heading}</h1>
        </div>
    );
}