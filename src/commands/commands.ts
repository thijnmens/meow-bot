import ping from './ping';
import help from './help';
import level from './level';
import leaderboard from './leaderboard';

export default class Commands {
	static readonly ping = ping;
	static readonly help = help;
	static readonly level = level;
	static readonly leaderboard = leaderboard;
}
