// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
// using complier 0.8.1
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract GenoCar is ERC721Enumerable, VRFConsumerBase, Ownable {
    using Strings for uint256;
    using Strings for string;

    bool public _isSaleActive = false;
    bool public _revealed = false;

    // Constants
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice = 0.03 ether;
    uint256 public maxBalance = 5;
    uint256 public maxMint = 1;

    string baseURI;
    string public notRevealedUri;
    string public baseExtension = ".json";

    mapping(uint256 => string) private _tokenURIs;

    
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;
    // rinkeby: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
    address public LinkToken;
    // rinkeby: 0x01BE23585060835E02B77ef475b0Cc51aA1e0709a

    struct Feature {
        uint256 WR;
        uint256 WD;
        uint256 CD;
        uint256 VL;
        uint256 WV;
        string name;
    }

    Feature[] public features;

    mapping(bytes32 => string) requestToFeatureName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash, string memory initBaseURI, string memory initNotRevealedUri)
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("Geno Car", "GC")
    {
        setBaseURI(initBaseURI);
        setNotRevealedURI(initNotRevealedUri);
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function mintGenoCar(uint256 tokenQuantity) public payable {
        require(
            totalSupply() + tokenQuantity <= MAX_SUPPLY,
            "Sale would exceed max supply"
        );
        require(_isSaleActive, "Sale must be active to mint GenoCars");
        require(
            balanceOf(msg.sender) + tokenQuantity <= maxBalance,
            "Sale would exceed max balance"
        );
        require(
            tokenQuantity * mintPrice <= msg.value,
            "Not enough ether sent"
        );
        require(tokenQuantity <= maxMint, "Can only mint 1 tokens at a time");

        _mintGenoCar(tokenQuantity);
    }

    function _mintGenoCar(uint256 tokenQuantity) internal {
        for (uint256 i = 0; i < tokenQuantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_SUPPLY) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

    function mergeGenoCar(address from, uint256 tokenId1, uint256 tokenId2) public payable {
        require(balanceOf(msg.sender) >= 2, "No enough Geno Cars, at least need 2");
        require(ownerOf(tokenId1) == msg.sender, "Not owner for token 1");
        require(ownerOf(tokenId2) == msg.sender, "Not owner for token 2");
        require(mintPrice <= msg.value, "Not enough ether sent");

        _mergeGenoCar(from, tokenId1, tokenId2);
    }

    function _mergeGenoCar(address from, uint256 tokenId1, uint256 tokenId2, uint256 randomNumber) internal {
        string _tokenId1Uri = getTokenURI(tokenId1);
        string _attribute1 = abi.decode(_tokenId1Uri)[attributes];
        string _tokenId2Uri = getTokenURI(tokenId2);
        string _attribute2 = abi.decode(_tokenId1Ur2)[attributes];
        _removeTokenFromOwnerEnumeration(from, tokenId1);
        _removeTokenFromOwnerEnumeration(from, tokenId2);
        for (uint256 i = 0; i < tokenQuantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_SUPPLY) {
                _safeMerge(msg.sender, mintIndex,  _attribute1, _attribute2, randomNumber);
            }
        }

    }

    // Mapping from owner to list of owned token IDs
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = ERC721.balanceOf(from) - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        delete _ownedTokensIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (_revealed == false) {
            return notRevealedUri;
        }

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return
            string(abi.encodePacked(base, tokenId.toString(), baseExtension));
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    //only owner
    function flipSaleActive() public onlyOwner {
        _isSaleActive = !_isSaleActive;
    }

    function flipReveal() public onlyOwner {
        _revealed = !_revealed;
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setMaxBalance(uint256 _maxBalance) public onlyOwner {
        maxBalance = _maxBalance;
    }

    function setMaxMint(uint256 _maxMint) public onlyOwner {
        maxMint = _maxMint;
    }

    function withdraw(address to) public onlyOwner {
        uint256 balance = address(this).balance;
        payable(to).transfer(balance);
    }

    function requestNewRandomFeature(
        string memory name
    ) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestToFeatureName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        setTokenURI(tokenId, _tokenURI);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 newId = features.length;
        uint256 WR = (randomNumber % 100);
        uint256 WD = ((randomNumber % 10000) / 100 );
        uint256 CD = ((randomNumber % 1000000) / 10000 );
        uint256 VL = ((randomNumber % 100000000) / 1000000 );
        uint256 WV = ((randomNumber % 10000000000) / 100000000 );

        features.push(
            Feature(
                WR,
                WD,
                CD,
                VL,
                WV,
                requestToFeatureName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], newId);
    }

    function getFeatureStats(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            features[tokenId].WR,
            features[tokenId].WD,
            features[tokenId].CD,
            features[tokenId].VL,
            features[tokenId].WV
        );
    }

   function verifyPartialRevealProof(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory input
  ) public view returns (bool r) {
    Proof memory proof;
    proof.A = Pairing3.G1Point(a[0], a[1]);
    proof.B = Pairing3.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
    proof.C = Pairing3.G1Point(c[0], c[1]);
    uint256[] memory inputValues = new uint256[](input.length);
    for (uint256 i = 0; i < input.length; i++) {
      inputValues[i] = input[i];
    }
    if (verify(inputValues, proof) == 0) {
      return true;
    } else {
      return false;
    }
  }
    // Partial reveal
  // Users can selectively reveal attributes about their NFT. 
  function partialReveal1(
    uint256[2] memory _a,
    uint256[2][2] memory _b,
    uint256[2] memory _c,
    uint256[1] memory _publicInputs,
    uint8 _tokenId
  ) public {
    require(partialRevealVerifier.verifyPartialRevealProof(_a, _b, _c, _publicInputs));
    require(characters[_tokenId].cHash == _publicInputs[0], "Invalid hash");
    emit PartialReveal(_tokenId, 1);
  }
  // Create a bid on the NFT
  function createBid(uint256 _tokenId) public payable notOwnerOf(_tokenId) {
    require(_tokenId <= tokenId, "Invalid NFT");
    bids[_tokenId][msg.sender] = msg.value;
    emit CreateBid(_tokenId, msg.sender, msg.value);
  }

  // Accept a bid on the NFT. If the owner is an original owner, they must reveal the NFT along with
  // the bid. If not, no proof is needed since all attributes are revealed already.
  function acceptBid(
    uint256[2] memory _a,
    uint256[2][2] memory _b,
    uint256[2] memory _c,
    uint256[4] memory _input,
    uint256 _tokenId,
    address _buyer
  ) public {
    if (ogOwners[_tokenId] == msg.sender) {
      require(revealVerifier.verifyProof(_a, _b, _c, _input), "Invalid proof"); // only og owners require proof
    }
    require(ownerOf(_tokenId) == msg.sender, "Not owner");
    balances[msg.sender] += bids[_tokenId][_buyer];
    transferFrom(msg.sender, _buyer, _tokenId);
    emit AcceptBid(_tokenId, msg.sender, _buyer, bids[_tokenId][_buyer]);
  }

  // Withdraw all balance from contract
  function withdraw() public {
    uint256 amount = balances[msg.sender];
    require(amount != 0, "Balance is empty");
    balances[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
  }
}
