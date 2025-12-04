import { Box, Text } from "@chakra-ui/react";
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { formatPlayCount } from "@/lib/utils";
import type { Album } from "@/types";

export interface ChartAlbumData {
	name: string;
	artist: string;
	playcount: number;
}

interface AlbumChartProps {
	albums: Album[];
	onAlbumClick?: (album: ChartAlbumData) => void;
}

interface ChartDataItem {
	name: string;
	playcount: number;
	fullName: string;
	artist: string;
}

const COLORS = [
	"#8b5cf6",
	"#a78bfa",
	"#c4b5fd",
	"#7c3aed",
	"#6d28d9",
	"#5b21b6",
	"#4c1d95",
	"#ddd6fe",
	"#ede9fe",
	"#9333ea",
];

function truncateName(name: string, maxLength = 20): string {
	if (name.length <= maxLength) return name;
	return `${name.slice(0, maxLength)}...`;
}

export function AlbumChart({ albums, onAlbumClick }: AlbumChartProps) {
	const chartData: ChartDataItem[] = albums
		.filter((album) => album.playcount !== undefined && album.playcount > 0)
		.map((album) => ({
			name: truncateName(album.name),
			playcount: album.playcount || 0,
			fullName: album.name,
			artist: album.artist,
		}))
		.sort((a, b) => b.playcount - a.playcount);

	if (chartData.length === 0) {
		return (
			<Box py={8} textAlign="center">
				<Text color="fg.muted">No album data available</Text>
			</Box>
		);
	}

	const handleBarClick = (data: ChartDataItem) => {
		if (onAlbumClick) {
			onAlbumClick({
				name: data.fullName,
				artist: data.artist,
				playcount: data.playcount,
			});
		}
	};

	const chartHeight = Math.max(400, chartData.length * 40);

	return (
		<Box w="100%" h={chartHeight}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={chartData}
					layout="vertical"
					margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
				>
					<XAxis
						type="number"
						tickFormatter={(value) => formatPlayCount(value)}
						fontSize={12}
					/>
					<YAxis
						type="category"
						dataKey="name"
						width={170}
						fontSize={12}
						tickLine={false}
					/>
					<Tooltip
						content={({ active, payload }) => {
							if (!active || !payload?.length) return null;
							const data = payload[0].payload as ChartDataItem;
							return (
								<Box
									bg="bg.subtle"
									border="1px solid"
									borderRadius="md"
									p={3}
									boxShadow="lg"
								>
									<Text fontWeight="semibold" fontSize="sm" mb={1}>
										{data.fullName}
									</Text>
									<Text color="primary.500" fontSize="xs" mb={1}>
										{data.artist}
									</Text>
									<Text color="fg.muted" fontSize="sm">
										{formatPlayCount(data.playcount)} plays
									</Text>
								</Box>
							);
						}}
					/>
					<Bar
						dataKey="playcount"
						radius={[0, 4, 4, 0]}
						cursor={onAlbumClick ? "pointer" : "default"}
						onClick={(data) => handleBarClick(data as unknown as ChartDataItem)}
					>
						{chartData.map((item, index) => (
							<Cell
								key={`${item.fullName}-${item.artist}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
}

