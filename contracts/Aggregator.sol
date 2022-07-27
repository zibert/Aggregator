// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";

contract Aggregator {
    address[] public routers;
    address[] public connectors;

    constructor(address[] memory _routers, address[] memory _connectors) {
        routers = _routers;
        connectors = _connectors;
    }

    function quote(
        uint256 _amountIn,
        address _tokenIn,
        address _tokenOut
    )
        external
        view
        returns (
            uint256,
            address,
            address[] memory
        )
    {
        address[] memory _path3 = new address[](3);
        address[] memory _path2 = new address[](2);
        _path3[0] = address(_tokenIn);
        _path3[2] = address(_tokenOut);
        _path2[0] = address(_tokenIn);
        _path2[1] = address(_tokenOut);

        address[] memory tokens = connectors;

        uint256 maxAmountOut;
        address maxRouter;
        address[] memory maxPath;

        uint256 amountIn2 = _amountIn;

        bool _success;
        bytes memory _returnData;

        for (uint256 i = 0; i < routers.length - 1; i++) {
            (_success, _returnData) = call(
                routers[i],
                amountIn2,
                _path2
            );
            if (_success) {
                uint256[] memory returnArray = abi.decode(
                    _returnData,
                    (uint256[])
                );
                if (returnArray[1] > maxAmountOut) {
                    maxAmountOut = returnArray[1];
                    maxRouter = routers[i];
                    maxPath = _path2;
                }
            }

            uint256 amountIn3 = amountIn2;
            for (uint256 k = 0; k < tokens.length - 1; k++) {
                _path3[1] = address(tokens[k]);
                (_success, _returnData) = call(
                    routers[i],
                    amountIn3,
                    _path3
                );
                if (_success) {
                    uint256[] memory returnArray = abi.decode(
                        _returnData,
                        (uint256[])
                    );
                    if (returnArray[1] > maxAmountOut) {
                        maxAmountOut = returnArray[1];
                        maxRouter = routers[i];
                        maxPath = _path3;
                    }
                }
            }
        }

        if (maxAmountOut == 0) {
            revert("path not found");
        }

        return (maxAmountOut, maxRouter, maxPath);
    }

    function call(
        address _router,
        uint256 _amountIn,
        address[] memory _path
    ) private view returns (bool, bytes memory) {
        (bool _success, bytes memory _returnData) = address(_router).staticcall(
            abi.encodeWithSignature(
                "getAmountsOut(uint256,address[])",
                _amountIn,
                _path
            )
        );
        return (_success, _returnData);
    }
}
