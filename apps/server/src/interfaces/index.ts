export interface CreatePoll {
  name: string;
  votesPerVoter: number;
  topic: string;
  email: string;
}

export interface CreatePollDto extends CreatePoll {
  userId: string;
  pollId: string;
}

export interface JoinPoll {
  pollId: string;
  name: string;
  email: string;
}

export interface JoinPollDto extends JoinPoll {
  userId: string;
}

export interface RejoinPoll {
  pollId: string;
  userId: string;
  name: string;
  email: string;
}

export interface RejoinPollDto extends RejoinPoll {}
