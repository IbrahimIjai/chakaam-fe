import { SearchInput } from "../ui/input";

type Props = {
  setTweetUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  tweet: string;
};

export default function TweetUpload({ setTweetUrl, disabled, tweet }: Props) {
  return (
    <SearchInput
      type="url"
      placeholder="Paste link here"
      onChange={setTweetUrl}
      disabled={disabled}
      className="px-4 w-full max-w-full bg-[#F8F8F8] placeholder:text-xs text-[#BEBEBE] tracking-tighter placeholder:tracking-tighter rounded-[5px]"
      value={tweet}
    />
  );
}
